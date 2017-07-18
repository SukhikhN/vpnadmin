<?php

namespace app\controllers;

use Yii;
use yii\helpers\ArrayHelper;
use yii\helpers\Url;
use yii\web\Controller;

class SiteController extends Controller
{
    /**
     * @var array Variables to be passed to JS
     */
    public $jsVars = [];
    
    public function init() {
        parent::init();
        $this->on(self::EVENT_BEFORE_ACTION, [$this, 'onBeforeAction']);
    }
    
    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    /**
     * Displays companies list.
     *
     * @return string
     */
    public function actionCompanies()
    {
        return $this->render('companies');
    }

    /**
     * Displays users list.
     *
     * @return string
     */
    public function actionUsers()
    {
        return $this->render('users');
    }
    
    /**
     * Displays abusers page.
     * 
     * @return string
     */
    public function actionAbusers()
    {
        //get list of months with traffic
        $months = \app\models\Traffic::activeMonths()->all();
        $months = ArrayHelper::map($months, function($m, $d=null) {
            //construct value attribute for dropdown's option tag
            return sprintf('%04d/%02d', $m['year'], $m['month']);
        }, function($m, $d=null) {
            //construct text for dropdown's option tag
            $date = \DateTime::createFromFormat('Y/m', sprintf('%04d/%02d', $m['year'], $m['month']));
            return $date->format('F Y');
        });
        
        return $this->render('abusers', ['months'=>$months]);
    }
    
    protected function onBeforeAction() {
        $this->jsVars['action'] = $this->action->uniqueId;
        $this->jsVars['apiUrl'] = Url::home(true);
    }
}
