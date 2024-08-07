export interface SerializationOptions {
    maxDomDepth?: number| null;
    maxObjectDepth?: number | null;
    includeShadowTree?: "none" | "open" | "all";
}
