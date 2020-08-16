import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addMovie } from "../../firebase";
import * as Yup from "yup";

const addMovieSchema = Yup.object().shape({
  movieName: Yup.string().required("Cannot be empty"),
  provider: Yup.string().required("Cannot be empty"),
  genres: Yup.string().required("Please select movie genres"),
  series: Yup.string().required("Cannot be empty"),
  creatorView: Yup.string().required("Cannot be empty"),
});

const AddMovieForm = () => {
  const history = useHistory();
  const [moviePoster, setmoviePoster] = useState({
    posterReviewUrl:
      "https://mycmgi.net/wp-content/uploads/2018/12/blank-photo.png",
    posterFile: null,
  });

  const handleFileUpload = (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];
    // console.log("file", file);
    reader.onloadend = () => {
      var dataURL = reader.result;
      setmoviePoster({
        ...moviePoster,
        posterFile: file,
        posterReviewUrl: dataURL,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          movieName: "",
          provider: "",
          genres: "",
          series: "",
          hasFinished: false,
          creatorView: "",
        }}
        validationSchema={addMovieSchema}
        onSubmit={(values, { reset }) => {
          console.log({ ...values, moviePoster: moviePoster.posterFile });
          addMovie({ ...values, moviePoster: moviePoster.posterFile }).then(
            () => {
              history.push("/home");
            }
          );
        }}
      >
        <Form>
          <label htmlFor="movieName">Movie Name</label>
          <Field name="movieName" placeholder="La la land" />
          <br />
          <label htmlFor="moviePoster">Movie Poster</label>
          <br />
          <input type="file" name="moviePoster" onChange={handleFileUpload} />
          <br />
          <figure
            style={{
              maxWidth: "150px",
              maxHeight: "300px",
              overflow: "hidden",
            }}
          >
            <img
              style={{ width: "100%" }}
              alt="preview movie poster"
              src={moviePoster.posterReviewUrl}
            />
          </figure>

          <br />
          <label htmlFor="provider">Provided by</label>
          <Field name="provider" placeholder="Netflix" />
          <br />
          <label htmlFor="series">Series</label>
          <Field name="series" placeholder="4 seasons" />
          <br />
          <label htmlFor="genres">Genres</label>
          <Field as="select" name="genres">
            <option value="0">Select genres</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="fantasy">Fantasy</option>
            <option value="horror">Horror</option>
            <option value="mystery">Mystery</option>
            <option value="romance">Romance</option>
            <option value="thriller">Thriller</option>
          </Field>
          <br />
          <label htmlFor="hasFinished">Finished?</label>
          <Field type="checkbox" name="hasFinished" />

          <br />
          <label htmlFor="creatorView">Your opinion</label>
          <Field as="textarea" name="creatorView" />
          <br />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </Fragment>
  );
};

export default AddMovieForm;
