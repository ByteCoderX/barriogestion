<?php

    function get_browser_name($user_agent)
    {
        if (strpos($user_agent, 'Opera') || strpos($user_agent, 'OPR/')) return 'Opera';
        elseif (strpos($user_agent, 'Edge')) return 'Edge';
        elseif (strpos($user_agent, 'Chrome')) return 'Chrome';
        elseif (strpos($user_agent, 'Safari')) return 'Safari';
        elseif (strpos($user_agent, 'Firefox')) return 'Firefox';
        elseif (strpos($user_agent, 'MSIE') || strpos($user_agent, 'Trident/7')) return 'Internet Explorer';

        return 'Other';
    }

class Logger {
    private $logFile;

    public function __construct($filename = 'app.log') {
        $this->logFile = __DIR__ . "/LogsFiles/$filename";
        if (!file_exists(dirname($this->logFile))) {
            mkdir(dirname($this->logFile), 0777, true);
        }
    }

    public function log($message, $level = 'INFO') {
        $time = date('Y-m-d H:i:s');
        $logEntry = "[$time] [$level] [" .
        $_SERVER['REMOTE_ADDR'] .
        "|".
        str_replace(['"', "'"], '', $_SERVER['HTTP_SEC_CH_UA_PLATFORM'])
        . "(" .
        get_browser_name($_SERVER['HTTP_USER_AGENT']) .
        ")] $message" . PHP_EOL;
        file_put_contents($this->logFile, $logEntry, FILE_APPEND);
    }

    public function info($message) {
        $this->log($message, 'INFO');
    }

    public function warning($message) {
        $this->log($message, 'WARNING');
    }

    public function error($message) {
        $this->log($message, 'ERROR');
    }
}
