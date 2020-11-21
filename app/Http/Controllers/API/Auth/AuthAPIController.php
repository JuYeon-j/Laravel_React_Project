<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\repositories\AuthRepository;


class AuthAPIController extends Controller
{
    public $authRepository;

    public function __construct(AuthRepository $authRepository){
        $this->authRepository = $authRepository;
    }

    public function createToken(){
        $user = User::first();
        $accessToken = $user->createToken('Token Name')->accessToken;
        return $accessToken;

    }

    public function login(Request $request){

        $formData = $request->all();

        $validator = \Validator::make($formData,[
            'email'=>'required',
            'password'=>'required',
        ], [
                'email.required'=>'Please give project email',
                'password.required'=>'Please give project password',
            ]
        );


        if($validator->fails()){
            return response()->json([
                'success'=> false,
                'message'=> $validator->getMessageBag()->first(),
                'errors'=> $validator->getMessageBag(),
            ]);
        }
    

        // $login = $request->validate(
        //     [
        //         'email'=>'required|string',
        //         'password'=>'required|string',
        //     ], [
        //             'email.required'=>'Please give project email',
        //             'password.required'=>'Please give project password',
        //         ]
        //     );

        // if(!Auth::attempt($login)){
        //     return 'false';
        // }else{
        //     return 'true';
        // }
        // return $login;


        if($this->authRepository->checkIfAuthenticated($request)){

            $user = $this->authRepository->findUserByEmailAddress($request->email);

            $accessToken = $user->createToken('authToken')->accessToken;
            return response()->json([
                'success'=> true,
                'message'=> 'Logged in successully',
                'user'=> $user,
                'access_token'=>$accessToken,
            ]);

        }else{
            return response()->json([
                'success'=> false,
                'message'=> 'Sorry Invalid Email and Password',
                'errors'=> null
            ]);

        }
    }

    public function register(Request $request){

        $formData = $request->all();

        $validator = \Validator::make($formData,[
            'name'=>'required',
            'email'=>'required|unique:users',
            'password'=>'required|confirmed',
        ], [
                'name.required'=>'Please give project name',
                'email.required'=>'Please give project email',
                'email.unique'=>'Your email address is already used, Please Login or use another',
                'password.required'=>'Please give project password',
            ]
        );

        if($validator->fails()){
            return response()->json([
                'success'=> false,
                'message'=> $validator->getMessageBag()->first(),
                'errors'=> $validator->getMessageBag(),
            ]);
        }

        $user = $this->authRepository->registerUser($request);
        if(!is_null($user)){

            $user = $this->authRepository->findUserByEmailAddress($request->email);

            $accessToken = $user->createToken('authToken')->accessToken;
            return response()->json([
                'success'=> true,
                'message'=> 'Registered successully',
                'user'=> $user,
                'access_token'=>$accessToken,
            ]);
        }else{
            return response()->json([
                'success'=> false,
                'message'=> 'Registration Cannot successfull',
                'errors'=> null
            ]);
        }
    }
}
