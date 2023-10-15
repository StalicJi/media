import React from 'react'
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'
import Skeleton from './Skeleton';
import Button from './Button'
import AlbumsListItem from './AlbumsListItem';

const AlbumsList = ({ user }) => {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  // console.log(data, error, isLoading);
  const [addAlbum, results] = useAddAlbumMutation();
  // console.log(results);

  const handleAddAlbum = () => {
    addAlbum(user);
  }

  let content;
    if (isFetching) {
      content = <Skeleton times={3} className='h-10 w-full'/>
    } else if (error) {
      content = <div>Error loading albums.</div>
    } else {
      content = data.map((album) => {
        return <AlbumsListItem key={album.id} album={album}/>
      })
    }

  return (
    <div>
      <div className='flex flex-row items-center justify-between mb-2'>
      <h3 className='text-lg font-bold'>
        Albums for {user.name}
      </h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          +Add ablum
        </Button>
      </div>
      <div>
        {content}
      </div>
    </div>
  )
}

export default AlbumsList
