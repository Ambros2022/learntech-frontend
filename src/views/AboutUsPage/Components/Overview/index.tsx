import React from 'react';

const Overview = () => {
    return (
        <>
            <section className='bg-white pt-3 pb-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-xl-2 col-lg-3 d-flex flex-column aboutUsSec">
                            <div className="d-flex align-items-start">
                                <div className="nav flex-column gap-3 nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <button className="nav-link active" id="v-pills-who-we-are-tab" data-bs-toggle="pill" data-bs-target="#v-pills-who-we-are" type="button" role="tab" aria-controls="v-pills-who-we-are" aria-selected="true">WHO WE ARE</button>
                                    <button className="nav-link" id="v-pills-our-mission-tab" data-bs-toggle="pill" data-bs-target="#v-pills-our-mission" type="button" role="tab" aria-controls="v-pills-our-mission" aria-selected="false">OUR MISSION</button>
                                    <button className="nav-link" id="v-pills-our-vision-tab" data-bs-toggle="pill" data-bs-target="#v-pills-our-vision" type="button" role="tab" aria-controls="v-pills-our-vision" aria-selected="false">OUR VISION</button>
                                    <button className="nav-link" id="v-pills-what-do-we-offer-tab" data-bs-toggle="pill" data-bs-target="#v-pills-what-do-we-offer" type="button" role="tab" aria-controls="v-pills-what-do-we-offer" aria-selected="false">What Do We Offer?</button>
                                    <button className="nav-link" id="v-pills-why-choose-us-tab" data-bs-toggle="pill" data-bs-target="#v-pills-why-choose-us" type="button" role="tab" aria-controls="v-pills-why-choose-us" aria-selected="false">Why Choose Us?</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-xl-10 col-lg-9">
                            <div className="tab-content mt-md-0 mt-3 text-black" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-who-we-are" role="tabpanel" aria-labelledby="v-pills-who-we-are-tab">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quidem, inventore recusandae unde error esse cum doloribus architecto ut rem asperiores maiores cumque provident velit eligendi hic dolorem, repudiandae neque voluptatem accusantium nulla necessitatibus voluptatum. Libero deserunt similique et obcaecati quae fugiat labore. Quidem temporibus quam placeat vel ea? Dolorum molestias dicta voluptate adipisci exercitationem harum amet similique, cum ipsa laborum quibusdam. Similique ad perferendis quae minus reiciendis eveniet, neque suscipit sequi cum nesciunt veniam ea delectus? Quos excepturi soluta voluptas animi vero nulla, asperiores necessitatibus nesciunt quaerat architecto, officiis temporibus enim dolores ipsum consequuntur facere ex officia.
                                </div>
                                <div className="tab-pane fade" id="v-pills-our-mission" role="tabpanel" aria-labelledby="v-pills-our-mission-tab">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quidem, inventore recusandae unde error esse cum doloribus architecto ut rem asperiores maiores cumque provident velit eligendi hic dolorem, repudiandae neque voluptatem accusantium nulla necessitatibus voluptatum. Libero deserunt similique et obcaecati quae fugiat labore. Quidem temporibus quam placeat vel ea? Dolorum molestias dicta voluptate adipisci exercitationem harum amet similique, cum ipsa laborum quibusdam. Similique ad perferendis quae minus reiciendis eveniet, neque suscipit sequi cum nesciunt veniam ea delectus? Quos excepturi soluta voluptas animi vero nulla, asperiores necessitatibus nesciunt quaerat architecto, officiis temporibus enim dolores ipsum consequuntur facere ex officia.                                </div>
                                <div className="tab-pane fade" id="v-pills-our-vision" role="tabpanel" aria-labelledby="v-pills-our-vision-tab">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quidem, inventore recusandae unde error esse cum doloribus architecto ut rem asperiores maiores cumque provident velit eligendi hic dolorem, repudiandae neque voluptatem accusantium nulla necessitatibus voluptatum. Libero deserunt similique et obcaecati quae fugiat labore. Quidem temporibus quam placeat vel ea? Dolorum molestias dicta voluptate adipisci exercitationem harum amet similique, cum ipsa laborum quibusdam. Similique ad perferendis quae minus reiciendis eveniet, neque suscipit sequi cum nesciunt veniam ea delectus? Quos excepturi soluta voluptas animi vero nulla, asperiores necessitatibus nesciunt quaerat architecto, officiis temporibus enim dolores ipsum consequuntur facere ex officia.                                </div>
                                <div className="tab-pane fade" id="v-pills-what-do-we-offer" role="tabpanel" aria-labelledby="v-pills-what-do-we-offer-tab">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quidem, inventore recusandae unde error esse cum doloribus architecto ut rem asperiores maiores cumque provident velit eligendi hic dolorem, repudiandae neque voluptatem accusantium nulla necessitatibus voluptatum. Libero deserunt similique et obcaecati quae fugiat labore. Quidem temporibus quam placeat vel ea? Dolorum molestias dicta voluptate adipisci exercitationem harum amet similique, cum ipsa laborum quibusdam. Similique ad perferendis quae minus reiciendis eveniet, neque suscipit sequi cum nesciunt veniam ea delectus? Quos excepturi soluta voluptas animi vero nulla, asperiores necessitatibus nesciunt quaerat architecto, officiis temporibus enim dolores ipsum consequuntur facere ex officia.                                </div>
                                <div className="tab-pane fade" id="v-pills-why-choose-us" role="tabpanel" aria-labelledby="v-pills-why-choose-us-tab">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quidem, inventore recusandae unde error esse cum doloribus architecto ut rem asperiores maiores cumque provident velit eligendi hic dolorem, repudiandae neque voluptatem accusantium nulla necessitatibus voluptatum. Libero deserunt similique et obcaecati quae fugiat labore. Quidem temporibus quam placeat vel ea? Dolorum molestias dicta voluptate adipisci exercitationem harum amet similique, cum ipsa laborum quibusdam. Similique ad perferendis quae minus reiciendis eveniet, neque suscipit sequi cum nesciunt veniam ea delectus? Quos excepturi soluta voluptas animi vero nulla, asperiores necessitatibus nesciunt quaerat architecto, officiis temporibus enim dolores ipsum consequuntur facere ex officia.                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Overview;
