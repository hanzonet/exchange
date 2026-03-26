import { Experiments } from '@luxexchange/gating'
import { LxEventName } from 'uniswap/src/features/telemetry/constants'
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send'

export function logExperimentQualifyingEvent({ experiment }: { experiment: Experiments }): void {
  sendAnalyticsEvent(LxEventName.ExperimentQualifyingEvent, {
    experiment,
  })
}
