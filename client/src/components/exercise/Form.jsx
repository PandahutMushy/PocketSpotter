import React, { useState } from 'react';
import { Box, Button, FormField, TextInput, Form, Heading } from 'grommet';
import { Redirect, Link } from "react-router-dom";
import { Save, Trash } from "grommet-icons";

// displays form to update an individual exercise in editDisplay container
function EditForm(props) {
  const [toWorkout, setToWorkout] = useState(false)
  const formSubmit = (evt) => {
    setToWorkout(true)
    props.handleExerciseFormSubmit(evt)
  }
  if (toWorkout === true) {
    return <Redirect to='/workout' />
  }
  return (
    <Form onSubmit={formSubmit}>
      <Heading
        level="2"
        margin={{
          bottom: "0.8rem",
          top: "none"
        }}
        pad="none"> Exercise: {props.exercise.name} </Heading>
      <FormField label="Sets:">
        <TextInput type="text" name="Sets" defaultValue={props.exercise.sets} />
      </FormField>
      <FormField label="Reps:">
        <TextInput type="text" name="Reps" defaultValue={props.exercise.reps} />
      </FormField>
      <FormField label="Rest Time:">
        <TextInput type="text" name="Rest" defaultValue={props.exercise.rest} />
        <TextInput type="hidden" name="ExName" value={props.exercise.name} />
      </FormField>
      <Box align="center" pad="large">
        <div><Link to="/workout">
          <Button
            alignSelf="start"
            label="Delete"
            margin="xsmall"
            style={{
              padding: "0.4rem 3rem"
            }}
            icon={<Trash />}
            onClick={() => {
              props.deleteExercise(props.workout, props.exercise)
            }}
          />
        </Link></div>
        <Button
          primary
          margin="small"
          style={{
            padding: "0.4rem 3.3rem"
          }}
          type="submit"
          label="Save"
          icon={<Save />}
          onClick={(e) => { console.log(e.target.parent) }}
        />
      </Box>
    </Form>
  )
}

export default EditForm