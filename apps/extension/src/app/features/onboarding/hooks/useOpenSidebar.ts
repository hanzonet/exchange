import { useEffect } from 'react'
import { getCurrentTabAndWindowId } from 'src/app/navigation/utils'
import { onboardingMessageChannel } from 'src/background/messagePassing/messageChannels'
import { OnboardingMessageType } from 'src/background/messagePassing/types/ExtensionMessages'
import { openSidePanel } from 'src/background/utils/chromeSidePanelUtils'
<<<<<<< Updated upstream
import { luxUrls } from '@luxexchange/lx/src/constants/urls'
import { logger } from '@luxfi/utilities/src/logger/logger'
import { useBooleanState } from '@luxfi/utilities/src/react/useBooleanState'
=======
import { luxUrls } from '@luxexchange/lx/src/constants/urls'
import { logger } from '@luxfi/utilities/src/logger/logger'
import { useBooleanState } from '@luxfi/utilities/src/react/useBooleanState'
>>>>>>> Stashed changes

export function useOpenSidebar() {
  const { value: openedSideBar, setTrue: openSideBar } = useBooleanState(false)

  useEffect(() => {
    const onSidebarOpenedListener = onboardingMessageChannel.addMessageListener(
      OnboardingMessageType.SidebarOpened,
      () => {
        openSideBar()
      },
    )
    return () => {
      onboardingMessageChannel.removeMessageListener(OnboardingMessageType.SidebarOpened, onSidebarOpenedListener)
    }
  }, [openSideBar])

  const handleOpenSidebar = async (): Promise<void> => {
    try {
      const { tabId, windowId } = await getCurrentTabAndWindowId()
      await openSidePanel(tabId, windowId)
    } catch (error) {
      logger.error(error, {
        tags: { file: 'useOpenSidebar.ts', function: 'handleOpenSidebar' },
      })
    }
  }

  const handleOpenWebApp = async (): Promise<void> => {
    window.location.href = luxUrls.webInterfaceSwapUrl
  }

  return { openedSideBar, handleOpenSidebar, handleOpenWebApp }
}
