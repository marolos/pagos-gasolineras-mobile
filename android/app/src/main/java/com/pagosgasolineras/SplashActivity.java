package com.pagosgasolineras;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
//import androidx.appcompat.app.AppCompatActivity;
//AppCompatActivity

public class SplashActivity extends ReactActivity {

   @Override
   protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      // Intent intent = new Intent(this, MainActivity.class);
      // startActivity(intent);
      // finish();
      try {
         Intent intent = new Intent(this, MainActivity.class);
         Bundle extras = getIntent().getExtras();

         if (extras != null) {
            intent.putExtras(extras);
         }
         intent.setAction(getIntent().getAction());
         intent.setData(getIntent().getData());
         startActivity(intent);
         finish();
      } catch (Exception e) {
         e.printStackTrace();
         finishAffinity();
      }
   }
}
