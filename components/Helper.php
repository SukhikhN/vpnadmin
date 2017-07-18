<?php

namespace app\components;

class Helper {
    /**
     * Convert bytes to terabytes
     * 
     * @param $bytes
     * @param int $precision
     * @return float
     */
    public static function bToTb($bytes, $precision=0) {
        return round($bytes/pow(10, 12), $precision);
    }
}
