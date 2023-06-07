import { FC, useState, useCallback } from 'react'
import Button from '../Button'
import { Formik } from 'formik'
import { validationNewCardSchema, initialValues } from './constant'
import {
  Input,
  InputController,
  InputError,
  Label,
} from '../Input/styles'
import { addNasaPhotoToCached } from '../../services/storage/Photos'
import { v4 as uuidv4 } from 'uuid';

const NewCard: FC = () => {
  const handleOnSubmit = useCallback((values: any) => {
    addNasaPhotoToCached({
      ...values,
      id:uuidv4(),
      status:"active",
      isFav: false
    })
  }, [])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationNewCardSchema}
      onSubmit={handleOnSubmit}
    >
      {({ handleSubmit, errors,handleChange}) => (
        <div className="cardContainer">
          <form onSubmit={handleSubmit} className="cardContent">
          <InputController>
                <Label>Camera name</Label>
                <Input 
                name="cameraName"
                onChange={handleChange}
                />
                {errors?.cameraName && <InputError>{errors.cameraName}</InputError>}
              </InputController>

              <InputController>
                <Label>Earth Date</Label>
                <Input 
                name="earthDate"
                onChange={handleChange}
                />
                {errors?.earthDate && <InputError>{errors.earthDate}</InputError>}
              </InputController>

              <InputController>
                <Label>Image</Label>
                <Input 
                name="image"
                onChange={handleChange}
                />
                {errors?.image && <InputError>{errors.image}</InputError>}
              </InputController>



            <Button type="submit">Añadir</Button>

          </form>
        </div>
      )}
    </Formik>
  )
}

export default NewCard
