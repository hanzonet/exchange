import { isAndroid } from '@luxfi/utilities/src/platform'

export function getCloudProviderName(): string {
  if (isAndroid) {
    return 'Google Drive'
  }
  return 'iCloud'
}
