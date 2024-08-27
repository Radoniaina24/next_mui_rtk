import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const holidayAPI = createApi({
  reducerPath: "holidayAPI",
  tagTypes: ["parametre"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
  }),
  endpoints: (builder) => ({
    getHoliday: builder.query({
      query: () => {
        return {
          url: `holiday`,
          method: "GET",
        };
      },
      providesTags: ["parametre"],
    }),
    getHolidayById: builder.query({
      query: (id) => {
        return {
          url: `holiday/${id}`,
          method: "GET",
        };
      },
      providesTags: ["parametre"],
    }),
    addHoliday: builder.mutation({
      query: (obj) => {
        return {
          url: `holiday`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["parametre"],
    }),
    updateHoliday: builder.mutation({
      query: ({ updateHoliday, id }) => {
        return {
          url: `holiday/${id}`,
          method: "PUT",
          body: updateHoliday,
        };
      },
      invalidatesTags: ["parametre"],
    }),
    deleteHoliday: builder.mutation({
      query: (id) => {
        return {
          url: `holiday/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["parametre"],
    }),
  }),
});

export const {
  useGetHolidayQuery,
  useGetHolidayByIdQuery,
  useAddHolidayMutation,
  useDeleteHolidayMutation,
  useUpdateHolidayMutation,
} = holidayAPI;
