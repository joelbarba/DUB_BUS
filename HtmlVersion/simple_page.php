<!DOCTYPE html>
<html>
<head>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>	
<!--    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>	-->
<!--    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">-->
	
<!--    <script src="js/lib/jquery.js"></script>-->
<!--    <script src="js/lib/angular.js"></script>-->
<!--    <script src="js/lib/angular-route.js"></script>-->
<!--    <script src="js/lib/angular-css.js"></script>-->
<!--    <script data-main="scripts/main" src="scripts/require.js"></script>-->
<!--    <script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script> -->
<!--	<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-sU_iXfll35fohb_goUYnNyqf8FSP9wg&callback=initMap"></script>-->

	<script>	
 		$(document).ready(function() {


		});
	</script>

	<style>
      html, body {
        height: 95%;
        text-transform:capitalize;
       
      }
      a { text-decoration: none;  padding: -40; }
	</style>
</head>

<body>
  <div class="container-fluid">
    <div class="row">
<!--
      <div style="border: 2px solid red; height: 800px;" class="col-md-3">
         <p>left side</p>
      </div>
-->
      
      <div style="border: 2px solid red; height: 800px;" class="col-md-9">
        
        <?php 
            $salt = "<br/>";
            echo "<p>php ini</p>";

            // ARRAYS
            echo "$salt";
        
            $var1 = array(10, 20, 30, 40, 50, 60, 70);                  // Declaració posicional
            $var2 = array('el1' => 100, 'el2' => 200, 'el3' => 300);    // Declaració per identificador
            
            print "$salt print_r -> ";  print_r($var1);      // printar array (posició/id, valor), 
            print "$salt var_dump -> "; var_dump($var1);     // printar array (posició/id, valor, tipus)
            print "$salt var_dump -> "; var_dump($var2);
          
            unset($var1[2]);    // Eliminar element del array
            $var1[] = 80;       // Afegir element a la ultima pos del array
            echo "$salt unset[2], [] = 80 -> "; var_dump($var1);
            echo "count : " . count($var1);			// Retorna el número d'elements al array
            
            $var1 = array_values($var1);  // Retorna un array reordenant tots els elements per omplir les posicions buides
            echo "$salt array_values -> "; var_dump($var1);
            
            echo "$salt";
            foreach ($var1 as $i => $value) { echo $var1[$i]; }	// Bucle per recorrer array
            echo "$salt";
            foreach ($var1 as $i => $value) { echo $value; }	// Bucle per recorrer array
            echo "$salt";
            for($t = 0; $t < count($var1); $t++) echo $var1[$t].", "; // Bucle per recorrer array
        
            echo $salt;
            rsort($var1); var_dump($var1); // Order descendent the array
            
        
            // STRINGS
            echo "$salt $salt";
        
            $vs = "Joel is the best of the world! Aye, the best and only the best";
            print $vs;
            echo " $salt strlen: ". strlen($vs);                  // Return the length
            echo " $salt str_word_count: ". str_word_count($vs);  // Word number
            echo " $salt strrev: ". strrev($vs);                  // Reverse string
            echo " $salt strpos: ". strpos($vs, "best");          // Return position of the 1st ocurrence "best" in $vs (case-insensitive)
            echo " $salt str_replace: ". str_replace("best", "worst", $vs);  // Replace "best" for "worst" (all occurrences)
                
        
        
            // SCOPES
            echo "$salt $salt";
        
            define("AUTH", "Joel Barba"); echo AUTH;  // Constant define
            define("CICO", 123390, true); echo Cico;  // Constant define (case insensitive)
            
        
            // Global var
            $global_var = 10;
            function fun1() { 
//                echo $global_var; // error (cannot access global var)
                $local_var = 20;
                global $global_var;
                echo $global_var;
            }
            fun1();
        
            echo $salt;
        
            // Static var
            function fun2() {
                static $x = 4;  // executet only the 1st time
                echo $x; $x++;
            }
            fun2();fun2();fun2(); // 456
          
            echo $salt;
            $t = 35;
            if ($t < 20) { echo "yes"; } elseif ($t < 30) { echo "mm"; } else { echo "no"; }
            if ($t < 20)   echo "yes";
        
            echo $salt;
            switch ($t) {
              case 15: echo "It is 15"; break;
              case 25: echo "It is 25"; break;
              default: echo "I don't know";
            }
            
        
            // BUCLES
            echo "$salt $salt";
            $t = 2;
            while($t <= 8) { echo $t++.","; } 
            do { echo $t++.","; } while($t <= 15);
            for ($t = 4; $t <= 12; $t++) { echo $t.","; }
            echo $salt;
            foreach ($var1 as $value) { echo $value.","; }	// Bucle per recorrer array
        
        
            // FUNCTIONS
            echo "$salt $salt";
            function fun3($p1, $p2, $p3 = "defalut") { echo "$p1 and $p2 and $p3"; }
            fun3("Jo", "el"); echo $salt;
            fun3("Jo", "el", "not default"); echo $salt;
        
            function fun4($p1) { return "$p1 is good"; }
            echo fun4("She"); echo $salt;
            
        
        
            echo "$salt $salt";
        
//            echo "_SERVER:"; print_r($_SERVER);     
        
            echo "Today is " . date("Y/m/d h:i:s") . "<br>";
            date_default_timezone_set("America/New_York");
            echo "Today is " . date("Y/m/d h:i:sa") . "<br>";
            
            //          hour min sec, month day  year
            $d = mktime(11,  14,  54,    08, 23, 2014);
            echo "Your date = " . date("Y/m/d h:i:sa", $d) . "<br>";
        
        
            echo "$salt $salt";
        
            function customError($errno, $errstr) {
              echo "<b>Error:</b> [$errno] $errstr<br>";
              echo "Ending Script";
              die();
            }
//            set_error_handler("customError");
            set_error_handler("customError", E_USER_WARNING);
//            echo($test);  // trigger error
//            trigger_error("Value must be 1 or below", E_USER_WARNING);
        
        
            // Exception
            echo 'Current PHP version: ' . phpversion();

            // trigger exception
            try {
//              $num = 30; if ($num > 1) throw new Exception("Value must be 1 or below"); 
            } catch(Exception $e) {
              echo 'Message: ' .$e->getMessage();
            }
        
            // Custom extended exception class
            class customException extends Exception {
              public function errorMessage() {
                return '<br/><br/> Error on line '.$this->getLine().' : '.$this->getMessage();
              }
            }
        
//            try { throw new customException("Error on custom exception"); }
//            catch (customException $e) { echo $e->errorMessage(); }
        
        
            // Classes
            echo "$salt $salt";

            class MyClass1 {
                var $year; 		// Public by default
                private $day = 3;
                public $hour = 10;
                protected $min = 12;

                function __construct($ini) { $this->year = $ini; }	// Constructor
//                function __destruct() { ... }				// Destructor

                function get_year()   { echo $this->year; }
                function set_year($y) { $this->year = $y; }
                public    function fun1() { $year++; }     // Accesible
                private   function fun2() { $year--; }     // Accesible only into the class
                protected function fun3() { $year += 2; }  // Accesible only into the class and their extended classes (not on the objects)
            }

            $obj1 = new MyClass1;	// Create object from the class
            $obj1->get_year();	// Method call
            $obj1->set_year(2000);
            $obj1->year = 3000;	// Direct acces to property

            $obj2 = new MyClass1(1970);	// Create object calling the constructor        
        

            class Foo {
               public static $my_static = 'valor';
               public function staticValue() {
                  return self::$my_static;
               }
            }
            print Foo::$my_static;
            $foo = new Foo();
            print $foo->staticValue();
        
            echo "<p>php end</p>";
        ?>
        
        <table>
          <tr>
            <td>Filter Name</td>
            <td>Filter ID</td>
          </tr>
          <?php
          foreach (filter_list() as $id =>$filter) {
              echo '<tr><td>' . $filter . '</td><td>' . filter_id($filter) . '</td></tr>';
          }
          ?>
        </table>

      </div>    
    </div>
  </div>
</body>
    
</html>