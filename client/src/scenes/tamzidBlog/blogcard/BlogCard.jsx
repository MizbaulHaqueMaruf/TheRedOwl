import React from "react";
import classes from "./blogcard.module.css";
import { FaCommentAlt } from "react-icons/fa";

const BlogCard = (props) => {
  return (
    <div className={classes.blogcard}>
      <div className="card mb-3 shadow-lg">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={props.img}
              className="img-fluid rounded-start h-100 "
              alt=""
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.title}</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit autem ducimus, doloremque nobis asperiores hic iste
                animi dolores, ipsum culpa quaerat optio molestiae amet. Odit
                hic harum voluptatem rem aperiam illo facilis commodi vero.
                Neque eius tempora, natus accusamus repudiandae harum
                consequuntur facere dolorum eaque ipsa facilis, at, quos vitae.
              </p>
              <div className="post-meta d-flex align-items-center justify-content-between">
                <div className="post-thumb d-flex">
                  <div className={classes.author}>
                    <img
                      className=" img-thumbnail img-fluid"
                      src="https://static.wixstatic.com/media/28999b_023d587307b84c6aa4dc3b03c034b3a2~mv2.jpg/v1/fill/w_585,h_410,al_c,lg_1,q_80,enc_auto/_75D9010-s.jpg"
                      alt=""
                    />
                  </div>
                  <p className={classes.authorname}>Mr.x</p>
                </div>
                <div className={classes.comment}>
                  <span className="position-relative">
                    <FaCommentAlt className={classes.cmnticon}/>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                      99+
                      
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
