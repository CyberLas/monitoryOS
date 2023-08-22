  
export const bytesToGB = (bytes: number = 1024) => `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`

export const mHzToGHz = (mhz: number = 1000) => `${(mhz / 1000).toFixed(2)} GHz`