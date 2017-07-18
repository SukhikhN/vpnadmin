<?php
namespace app\controllers;

use yii\rest\Controller;
use app\models\Traffic;

class AbusersController extends Controller {
    
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        //disable rate limiter
        if (isset($behaviors['rateLimiter']))
            unset($behaviors['rateLimiter']);

        return $behaviors;
    }
    
    /**
     * Generate random traffic data for last 6 months
     * 
     * @return array
     */
    public function actionGenerate() {
        Traffic::deleteAll();
        Traffic::generate(new \DateTime('-6 months'), new \DateTime());
        return [
            'status' => \Yii::$app->response->statusCode,
        ];
    }
}
