import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const addMovieSchema = Yup.object().shape({
  movieName: Yup.string().required("Cannot be empty"),
  provider: Yup.string().required("Cannot be empty"),
  genres: Yup.string().required("Please select movie genres"),
  series: Yup.string().required("Cannot be empty"),
  creatorView: Yup.string().required("Cannot be empty"),
});

const AddMovieForm = () => {
  return (
    <Formik
      initialValues={{
        movieName: "",
        provider: "",
        genres: "",
        series: "",
        hasFinished: false,
        moviePoster: "",
        creatorView: "",
      }}
      validationSchema={addMovieSchema}
      onSubmit={(values, { reset }) => {
        console.log(values);
        reset();
      }}
    >
      <Form>
        <label htmlFor="movieName">Movie Name</label>
        <Field name="movieName" placeholder="La la land" />
        <br />
        <label htmlFor="provider">Provided by</label>
        <Field name="provider" placeholder="Netflix" />
        <br />
        <label htmlFor="genres">Genres</label>
        <Field as="select" name="genres">
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
        <label htmlFor="moviePoster">Movie Poster</label>
        <Field type="file" name="moviePoster" />
        <br />
        <label htmlFor="creatorView">Your opinion</label>
        <Field as="textarea" name="creatorView" />
        <br />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default AddMovieForm;
