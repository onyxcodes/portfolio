export type MediaType = {
    id: number,
    attributes: {
        name: string;
        alternativeText: string;
        caption: string;
        width: number | null,
        height: number | null,
        previewUrl: any; // TODO: specify
        formats: any,
        hash: string,
        ext: string,
        mime: string,
        size: number;
        url: string;
        provider: string;
        provider_metadata: any;
        createdAt: string;
        updatedAt: string;
    }
}

export type PaginationType = {
    page: number,
    pageSize: number,
    pageCount: number,
    total: number
}