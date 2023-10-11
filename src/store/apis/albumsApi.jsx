import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
    }),
    endpoints(builder) {
        return {
            fetchAlbums: builder.query({ 
                providesTags: ['Album'], //重新渲染畫面的TAG，和mutation的一樣
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
                invalidatesTags: ['Album'], //加入的TAG
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
        };
    }
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };