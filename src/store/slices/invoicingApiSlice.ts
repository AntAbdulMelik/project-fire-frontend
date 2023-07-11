import apiSlice from "store/slices/apiSlice";

export const invoicingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: ({
        client,
        invoiceStatus,
        orderByField,
        orderDirection,
        invoicesPerPage,
        currentPage,
      }) => ({
        url: `/invoices?client=${client}&invoiceStatus=${invoiceStatus}&orderByField=${orderByField}&orderDirection=${orderDirection}&take=${invoicesPerPage}&page=${currentPage}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.invoices.map(({ id }: { id: string }) => ({
                type: "Invoice" as const,
                id,
              })),
              "Invoice",
            ]
          : ["Invoice"],
    }),
    createInvoice: builder.mutation({
      query: (data) => ({
        url: "/invoices",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Invoice"],
    }),
    updateInvoice: builder.mutation({
      query: ({ invoiceId, data }) => ({
        url: `/invoices/${invoiceId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Invoice"],
    }),
    deleteInvoice: builder.mutation({
      query: ({ invoiceId }) => ({
        url: `/invoices/${invoiceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invoice"],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoicingApiSlice;
