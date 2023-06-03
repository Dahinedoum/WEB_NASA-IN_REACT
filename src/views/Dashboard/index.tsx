import { FC, useCallback, useEffect, useState } from 'react'
import Card from '../../components/Card'
import Header from '../../components/Header'
import { getNasaPhotos } from '../../services/nasa'
import './styles.css'
import { Photo } from '../../models/Photo'
import { motion } from 'framer-motion'
import {
  getFavPhotos,
  removeCachedNasaPhotos,
} from '../../services/storage/Photos'

const Dashboard: FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const handleSetPhotos = useCallback(async () => {
    let photosList = await getNasaPhotos()
    const favPhotoList = await getFavPhotos()
    photosList = photosList.map((photo) => {
      const isFav = !!favPhotoList.find((favPhoto) => favPhoto.id === photo.id)

      return{
        ...photo,
        isFav
      }
    })

    setPhotos(photosList)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    handleSetPhotos()
  }, [handleSetPhotos])

  const handleRemove = useCallback((photo: Photo) => {
    const newList = removeCachedNasaPhotos(photo)
    setPhotos(newList)
  }, [])

  if (isLoading) {
    return <div>CARGANDO IMÁGENES...</div>
  }

  return (
    <div>
      <Header />

      <div className="dashboardContent">
        <motion.div className="dashboardCard">
          <motion.div className="slider-container">
            <motion.div
              className="slider"
              drag="x"
              dragConstraints={{ right: 0 }}
            >
              {photos.map((photo) => (
                <Card key={photo.id} photo={photo} onRemove={handleRemove} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
