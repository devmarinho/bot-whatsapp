const options = (headless, start) => {
    return {
        blockCrashLogs: false,
        disableSpins: false,
        hostNotificationLang: 'PT_BR',
        logConsole: true,
        viewport: {
            width: 1920,
            height: 1200
        },
        popup: 3012,
        multiDevice: true,
        defaultViewport: null,
        sessionId: 'Gramont-Bot',
        headless: headless,
        qrTimeout: 0,
        authTimeout: 60,
        restartOnCrash: start,
        cacheEnabled: true,
        useChrome: true,
        killProcessOnBrowserClose: true,
        throwErrorOnTosBlock: true,
        inDocker: true,
    }
}

export default options
