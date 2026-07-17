'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'

const API = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')

async function getJSON<T = any>(path: string, signal?: AbortSignal): Promise<T | null> {
  const res = await fetch(`${API}${path}`, { signal })
  if (!res.ok) return null
  return res.json()
}

async function postJSON<T = any>(path: string, body: unknown): Promise<T | null> {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) return null
  return res.json()
}

interface RatingCount {
  [key: string]: number
}

interface RatingDistribution {
  stars: number
  count: number
}

interface Props {
  /** college / school / board id — review APIs key on college_id */
  entityId: number | string
  /** display name shown in headings */
  entityName: string
}

const ReviewSec = ({ entityId, entityName }: Props) => {
  const [avgRating, setAvgRating] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)
  const [ratingCounts, setRatingCounts] = useState<RatingCount>({})
  const [cardData, setCardData] = useState<any[]>([])
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null)
  const [userId, setUserId] = useState('')
  const [likedReviews, setLikedReviews] = useState<number[]>([])
  const [dislikedReviews, setDisLikedReviews] = useState<number[]>([])
  const [visibleCards, setVisibleCards] = useState(2)
  const [showAllComments, setShowAllComments] = useState(false)

  useEffect(() => {
    const ctrl = new AbortController()
    ;(async () => {
      try {
        const [ratingRes, reviewsRes, allRes] = await Promise.all([
          getJSON(`/api/website/reviewrating/get?college_id=${entityId}&page=1&size=8`, ctrl.signal),
          getJSON(`/api/website/findonereview/get?size=1000&college_id=${entityId}`, ctrl.signal),
          getJSON(`/api/website/allreview/get`, ctrl.signal),
        ])

        const stats = ratingRes?.totalLikesDislikes?.[0]
        if (stats) {
          setAvgRating(parseFloat(stats.avgRating) || 0)
          setTotalReviews(stats.totalReviews || 0)
        }
        setRatingCounts(ratingRes?.ratingCounts?.[entityId]?.ratings ?? {})
        setCardData(reviewsRes?.data ?? [])
        setUserId(allRes?.data?.[0]?.user_id ?? '')
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('ReviewSec fetch failed:', err)
        }
      }
    })()
    return () => ctrl.abort()
  }, [entityId])

  const ratingDistribution: RatingDistribution[] = Array.from({ length: 5 }, (_, i) => {
    const stars = 5 - i
    return { stars, count: ratingCounts[stars.toString()] || 0 }
  })

  const renderStars = () => {
    const roundedRating = Math.round(avgRating)
    return (
      <div className="starRating d-flex flex-row mb-2 justify-content-center">
        {[1, 2, 3, 4, 5].map((value) => (
          <span key={value} className={`star ${value <= roundedRating ? 'selected' : ''}`}>
            &#9733;
          </span>
        ))}
      </div>
    )
  }

  const toggleReplyForm = (reviewId: number) => {
    setShowReplyForm((prev) => !prev)
    setSelectedReviewId(reviewId)
  }

  const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const json = await postJSON(`/api/website/addreviewreply/post`, {
      review_id: selectedReviewId,
      content: replyContent,
      user_id: userId,
    })
    const newReply = json?.data
    if (newReply) {
      setCardData((prev) =>
        prev.map((review) =>
          review.id === selectedReviewId
            ? { ...review, reviewreply: [...(review.reviewreply ?? []), newReply] }
            : review,
        ),
      )
    }
    setShowReplyForm(false)
    setReplyContent('')
  }

  const handleLoadMore = () => setVisibleCards((v) => v + 3)
  const handleViewAllClick = () => setShowAllComments((v) => !v)

  const handleLikeDislikeClick = async (reviewId: number, action: 'like' | 'dislike') => {
    if (action === 'like' && likedReviews.includes(reviewId)) return
    if (action === 'dislike' && dislikedReviews.includes(reviewId)) return

    const json = await postJSON(`/api/website/review/likesupdate`, {
      id: reviewId,
      like: action === 'like' ? 1 : 0,
      dislike: action === 'dislike' ? 1 : 0,
    })
    const updatedReview = json?.updatedReview
    if (!updatedReview) return

    if (action === 'like') setLikedReviews((prev) => [...prev, reviewId])
    else setDisLikedReviews((prev) => [...prev, reviewId])

    setCardData((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? { ...review, likes: updatedReview.likes, dislikes: updatedReview.dislikes }
          : review,
      ),
    )
  }

  return (
    <section className="bg-white py-3">
      <div className="container">
        <h2 className="fw-bold text-blue mb-3">{entityName} Overall Rating</h2>
        <div className="row py-5 bg-skyBlue rounded">
          <div className="col-md-6 col-lg-4">
            <h4 className="fw-bold text-blue text-center">{avgRating} Overall Rating</h4>
            {renderStars()}
            <h6 className="text-black text-center">(Based on {totalReviews} reviews)</h6>
          </div>
          <div className="col-md-6 mt-md-0 mt-3 col-lg-4">
            <h4 className="text-blue fw-bold text-center mb-3">Distribution of Rating</h4>
            {ratingDistribution.map((rating) => (
              <div key={rating.stars} className="rating-bar">
                <span>{rating.stars} stars</span>
                <div className="progress">
                  <div
                    className="progress-bars"
                    style={{ width: rating.count ? `${(rating.count / totalReviews) * 100}%` : '10%' }}
                  >
                    {rating.count}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-6 col-10 mx-auto col-lg-3 mt-3 mt-md-5 mt-lg-0 mx-md-auto border p-3 text-center">
            <h4 className="text-blue fw-bold text-center mb-4">Write a helpful review!</h4>
            <p className="text-black text-center mb-5">
              It&apos;s not about being good or bad; what matters is being honest and genuine.
            </p>
            <Link href="/write-review" className="btn writeReviewBtn">
              Write a Review
            </Link>
          </div>
        </div>

        <div className="row col-md-12 col-10 mx-md-0 mx-auto pt-5">
          {cardData.slice(0, visibleCards).map((review) => (
            <div key={review.id} className="card p-3 mb-5 bg-skyBlue">
              <div className="row">
                <div className="col-md-2 text-center">
                  <i className="fs-1 bi bi-person-circle" />
                </div>
                <div className="col-md-10 d-flex justify-content-md-between justify-content-center flex-md-row flex-column">
                  <div className="align-self-center">
                    <h4 className="fw-bold text-blue">{review.name}</h4>
                  </div>
                  <div className="align-self-center">
                    <h6 className="text-blue pb-3 pb-md-0">
                      <span>
                        <i className="bi bi-patch-check-fill text-success" />
                      </span>{' '}
                      Verified
                    </h6>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="ms-auto col-md-10">
                  <h6>
                    {review.userrating} Reviewed{' '}
                    <span className="starRatings ms-1 me-1 mt-3">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span key={value} className={`star ${value <= review.userrating ? 'selected' : ''}`}>
                          &#9733;
                        </span>
                      ))}
                    </span>{' '}
                    on {format(new Date(review.created_at), 'MMM dd, yyyy hh:mm a')}
                  </h6>
                </div>
                <div className="ms-auto col-md-10">
                  <ul>
                    <li>Batch {review.passing_year}</li>
                    <li>B.Tech (Bachelor of Technology)</li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <h6 className="text-black fw-bold">Student Comments:</h6>
                <p>{review.content}</p>
              </div>
              <div className="d-flex">
                <button className="btn text-blue" onClick={() => handleLikeDislikeClick(review.id, 'like')}>
                  <i className={`bi ${likedReviews.includes(review.id) ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'}`} />{' '}
                  {review.likes}
                </button>
                <button className="btn text-blue" onClick={() => handleLikeDislikeClick(review.id, 'dislike')}>
                  <i className={`bi ${dislikedReviews.includes(review.id) ? 'bi-hand-thumbs-down-fill' : 'bi-hand-thumbs-down'}`} />{' '}
                  {review.dislikes}
                </button>
                <button className="btn text-blue" style={{ cursor: 'default' }}>
                  <i className="bi bi-flag" /> Report
                </button>
                <button className="btn text-blue" onClick={() => toggleReplyForm(review.id)}>
                  <i className="bi bi-reply" /> Reply
                </button>
              </div>

              {showReplyForm && selectedReviewId === review.id && (
                <div className="d-flex align-items-start">
                  <form onSubmit={handleReplySubmit} className="d-flex align-items-center col-md-8 col-12">
                    <textarea
                      className="form-control"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write your reply..."
                      required
                    />
                    <button type="submit" className="btn btn-primary ms-2">
                      Submit
                    </button>
                  </form>
                </div>
              )}

              {review.reviewreply?.length > 0 && (
                <div className="review-replies">
                  <h6 className="fw-bold text-black">Replies:</h6>
                  {review.reviewreply.slice(0, showAllComments ? undefined : 2).map((reply: any) => (
                    <div className="reply" key={reply.id}>
                      <p>{reply.content}</p>
                    </div>
                  ))}
                  {review.reviewreply.length > 2 && (
                    <div className="text-start mt-2">
                      <button className="btn viewMoreCollegeBtn" onClick={handleViewAllClick}>
                        {showAllComments ? 'Show Less' : `View All (${review.reviewreply.length})`}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {cardData.length > visibleCards && (
          <div className="text-center">
            <button className="btn viewMoreCollegeBtn" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default ReviewSec
