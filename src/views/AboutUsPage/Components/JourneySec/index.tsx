import styles from "src/views/AboutUsPage/aboutUsPage.module.css";
import YouTubePlayerFacade from "src/components/ui/YouTubePlayerFacade";

const JourneySec = () => {
  return (
    <section className="bg-white pt-0 pt-md-0">
      <div className="container">
        <h2 className="fw-bold text-blue text-center mb-5">
          The Journey of Learntech Edu Solutions
        </h2>
        <div className={styles.journeyVideo + ' bg-blue rounded p-2 mx-auto'}>
          <YouTubePlayerFacade
            videoId="ubcwVybnL4Q"
            title="The Journey of Learntech Edu Solutions"
            className="h-100 rounded w-100"
          />
        </div>
      </div>
    </section>
  )
}

export default JourneySec

