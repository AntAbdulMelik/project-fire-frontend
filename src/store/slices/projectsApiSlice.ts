import apiSlice from "store/slices/apiSlice";

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({
        searchTerm,
        projectStatus,
        orderByField,
        orderDirection,
        projectsPerPage,
        currentPage,
      }) => ({
        url: `/projects?name=${searchTerm}&projectStatus=${projectStatus}&orderByField=${orderByField}&orderDirection=${orderDirection}&take=${projectsPerPage}&page=${currentPage}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.projects.map(({ id }: { id: string }) => ({
                type: "Project" as const,
                id,
              })),
              "Project",
            ]
          : ["Project"],
    }),
    getProjectsInfo: builder.query({
      query: ({ year }) => ({
        url: `/projects/info?year=${year}`,
        method: "GET",
      }),
    }),
    createProject: builder.mutation({
      query: (data) => ({ url: "/projects", method: "POST", body: data }),
      invalidatesTags: ["Project"],
    }),
    updateProject: builder.mutation({
      query: ({ projectId, data }) => ({
        url: `/projects/${projectId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
    deleteProject: builder.mutation({
      query: ({ projectId }) => ({
        url: `/projects/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectsInfoQuery,
  useUpdateProjectMutation,
  useCreateProjectMutation,
  useDeleteProjectMutation,
} = projectsApiSlice;
