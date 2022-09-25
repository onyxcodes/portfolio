export type MenuEntryType = {
    attributes: {
        order: number;
        title: string;
        url: string;
        createdAt: string;
        updatedAt: string;
        children: {
            data: MenuEntryType[]
        }
    };
    id: number;
}