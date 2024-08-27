import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const permissionAPI = createApi({
  reducerPath: "permissionAPI",
  tagTypes: ["parametre"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
  }),
  endpoints: (builder) => ({
    getPermission: builder.query({
      query: () => {
        return {
          url: `permission`,
          method: "GET",
        };
      },
      providesTags: ["parametre"],
    }),
    getPermissionById: builder.query({
      query: (id) => {
        return {
          url: `permission/${id}`,
          method: "GET",
        };
      },
      providesTags: ["parametre"],
    }),
    addPermission: builder.mutation({
      query: (obj) => {
        return {
          url: `permission`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["parametre"],
    }),
    updatePermission: builder.mutation({
      query: ({ updatePermission, id }) => {
        return {
          url: `permission/${id}`,
          method: "PUT",
          body: updatePermission,
        };
      },
      invalidatesTags: ["parametre"],
    }),
    deletePermission: builder.mutation({
      query: (id) => {
        return {
          url: `permission/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["parametre"],
    }),
  }),
});

export const {
  useGetPermissionQuery,
  useGetPermissionByIdQuery,
  useAddPermissionMutation,
  useDeletePermissionMutation,
  useUpdatePermissionMutation,
} = permissionAPI;
