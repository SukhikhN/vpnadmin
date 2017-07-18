<?php

namespace app\controllers;

use yii\web\Controller;
use yii\web\NotFoundHttpException;
use app\models\Company;
use app\models\User;

class AjaxController extends Controller {
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
    
    public function actionUserForm($id) {
        if ($id===0) {
            $user = new User();
        } else {
            $user = User::findOne($id);
        }

        if ($user===null)
            throw new NotFoundHttpException();
        return $this->renderAjax('user-form', ['user'=>$user]);
    }
}
