import React from 'react'
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button'

const AlbumsList = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  // console.log(data, error, isLoading);
  const [addAlbum, results] = useAddAlbumMutation();
  console.log(results);

  const handleAddAlbum = () => {
    addAlbum(user);
  }

  let content;
    if (isLoading) {
      content = <Skeleton times={3}/>
    } else if (error) {
      content = <div>Error loading albums.</div>
    } else {
      content = data.map((album) => {
        const header = <div>{album.title}</div>

        return <ExpandablePanel key={album.id} header={header}>
          List of photos in album
        </ExpandablePanel>
      })
    }

  return (
    <div>
      <div className='flex items-center justify-between mb-3'>
        Albums for {user.name}
        <Button onClick={handleAddAlbum}>
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
