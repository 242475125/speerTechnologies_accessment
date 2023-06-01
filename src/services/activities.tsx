import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IActivities{
    id: number,
    created_at: string,
    direction: string,
    from: string,
    to: string,
    via: string,
    duration: number,
    is_archived: boolean,
    call_type: 'missed' | 'answered' | 'voicemail'
}
export const activitiesApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://cerulean-marlin-wig.cyclic.app/' }),
    tagTypes: ['activities'],
    endpoints: (builder) => ({
        getAllActivities: builder.query({
            query: () => 'activities',
            providesTags: ['activities'],
        }),
        getActivityWithID: builder.query({
            query: (id: string) => `activities/${id}`,
        }),
        updateActivityWithID: builder.mutation({
            query: (id: number) => ({
                url: `activities/${id}`,
                method: 'PATCH',
                body: { is_archived: true },
            }),
            invalidatesTags: ['activities']
        }),
        resetArchivedActivities: builder.mutation({
            query: () => ({
                url: 'reset',
                method: 'PATCH'
            }),
            invalidatesTags: ['activities'],
        }),
    }),
});

export const {useGetAllActivitiesQuery, useGetActivityWithIDQuery, useUpdateActivityWithIDMutation, useResetArchivedActivitiesMutation} = activitiesApi;