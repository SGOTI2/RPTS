import { initializeUI } from '@firebase-oss/ui-core';
import { app } from '../lib/networking/firebase'

export default app ? initializeUI({
  app,
}) : null;