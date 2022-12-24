import { SupportedMethods } from './supportedMethods'

export interface BidiRequest {
    method: SupportedMethods
    /**
     * types will be more defined later
     */
    params: Record<string, any>
}
