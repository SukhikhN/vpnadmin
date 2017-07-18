<?php

namespace app\controllers;

use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\helpers\ArrayHelper;
use app\models\Company;
use app\models\User;

/**
 * Class AjaxController provides various AJAX HTML actions
 * 
 * @package app\controllers
 */
class AjaxController extends Controller {
    
    /**
     * Render Company form
     * 
     * @param int $id Company ID, 0 for new company form
     * @return string
     * @throws NotFoundHttpException
     */
    public function actionCompanyForm($id) {
        if ($id===0) {
            $company = new Company();
        } else {
            $company = Company::findOne($id);
        }
        
        if ($company===null)
            throw new NotFoundHttpException();
        return $this->renderAjax('company-form', ['company'=>$company]);
    }

    /**
     * Render User form
     * 
     * @param int $id User ID, 0 for new company form
     * @return string
     * @throws NotFoundHttpException
     */
    public function actionUserForm($id) {
        if ($id===0) {
            $user = new User();
        } else {
            $user = User::findOne($id);
        }
        
        if ($user===null)
            throw new NotFoundHttpException();
        
        //get list of companies for the dropdown list
        $companies = ArrayHelper::map(Company::find()->all(), 'id', 'name');
        
        return $this->renderAjax('user-form', ['user'=>$user, 'companies'=>$companies]);
    }
}
