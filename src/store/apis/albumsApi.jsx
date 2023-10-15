import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

//DEV ONLY!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve,duration);
    });
}

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        //DEV ONLY!!
        fetchFn: async(...args) => {
            await pause(2000);
            return fetch(...args);
        }
    }),
    endpoints(builder) {
        return {
            fetchAlbums: builder.query({ 
                providesTags: (result, error, user) => {  //重新渲染畫面的TAG，和mutation的一樣
                    // return [{ type: 'Album', id: user.id }] //加入id避免重複渲染
                    const tags = result.map((album) => {
                        return { type: 'Album', id: album.id }
                    });
                    tags.push({ type: 'UserAlbums', id: user.id });
                    return tags;
                }, 
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id
                        },
                        method:'GET',
                    };
                }
            }),
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => { //加入的TAG
                    return [{ type: 'UserAlbums', id: user.id }]
                }, 
                query: (user) => {
                    return {
                        url:'/albums',
                        method:'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName(),
                        }
                    }
                }
            }),
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'Album', id: album.Id }]
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method:'DELETE'
                    }
                }
            })
        };
    }
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };