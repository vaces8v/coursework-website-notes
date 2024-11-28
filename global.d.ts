declare var URL: {
    createObjectURL(blob: Blob): string;
    revokeObjectURL(url: string): void;
};