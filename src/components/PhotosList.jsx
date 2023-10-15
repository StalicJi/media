import React from 'react';
import { useFetchPhotosQuery, useAddPhotoMutation } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import PhotosListItem from './PhotosListItem';

const PhotosList = ({ ablum }) => {
const { data, error, isFetching } = useFetchPhotosQuery(ablum);
const [ addPhoto, addPhotoResults ] = useAddPhotoMutation();

const handleAddPhoto = () => {
    addPhoto(ablum);
};

let content;
if (isFetching) {
    content = <Skeleton className='h8 w-8' times={4}/>
} else if (error) {
    content = <div>Error Fetching photos.</div>
} else {
    content = data.map((photo) => {
        return <PhotosListItem key={photo.id} photo={photo}/>
    })
}

  return (
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg font-bold'>Photos In {ablum.title}</h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
            +Add Photo
        </Button>
      </div>
      <div className='mx-8 flex flex-row flex-wrap justify-center'>{content}</div>
    </div>
  )
}

export default PhotosList
