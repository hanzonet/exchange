import { Experiments } from '@luxfi/gating'
import { LuxEventName } from '@luxexchange/lx/src/features/telemetry/constants'
import { sendAnalyticsEvent } from '@luxexchange/lx/src/features/telemetry/send'

export function logExperimentQualifyingEvent({ experiment }: { experiment: Experiments }): void {
  sendAnalyticsEvent(LuxEventName.ExperimentQualifyingEvent, {
    experiment,
  })
}
