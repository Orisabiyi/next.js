import type { OverlayDispatch, OverlayState } from '../../shared'

import { Suspense, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogBody } from '../dialog'
import { Overlay } from '../overlay/overlay'
import { useFocusTrap } from '../errors/dev-tools-indicator/utils'
import { useDelayedRender } from '../../hooks/use-delayed-render'
import { ACTION_DEVTOOLS_PANEL_TOGGLE } from '../../shared'

export function DevToolsPanel({
  state,
  dispatch,
}: {
  state: OverlayState
  dispatch: OverlayDispatch
}) {
  const dialogRef = useRef<HTMLDivElement>(null)

  // This hook lets us do an exit animation before unmounting the component
  const { mounted, rendered } = useDelayedRender(state.isDevToolsPanelOpen)

  useFocusTrap(dialogRef, null, rendered)

  if (!mounted) {
    // Workaround React quirk that triggers "Switch to client-side rendering" if
    // we return no Suspense boundary here.
    return <Suspense />
  }

  const onClose = () => {
    dispatch({ type: ACTION_DEVTOOLS_PANEL_TOGGLE })
  }

  return (
    <Overlay className="p-0 top-[10vh]">
      <div
        className="dev-tools-panel-dialog-container antialiased flex flex-col bg-[var(--color-background-100)] bg-clip-padding border-solid border-[var(--color-gray-400)] rounded-b-[var(--next-dialog-radius)] shadow-[var(--shadow-menu)] relative overflow-hidden min-w-[800px] min-h-[500px]"
        ref={dialogRef}
      >
        <Dialog
          aria-labelledby="nextjs__container_dev_tools_panel_label"
          aria-describedby="nextjs__container_dev_tools_panel_desc"
          className="dev-tools-panel-dialog-scroll overflow-y-auto h-full"
          onClose={onClose}
        >
          <DialogContent>
            <DialogHeader></DialogHeader>
            <DialogBody>
              <div>DevToolsPanel</div>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </div>
    </Overlay>
  )
}
