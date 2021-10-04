<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Payment - Magnova Tech</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
        body {
            font-family: Arial;
            font-size: 17px;
            padding: 8px;
            color: white;

        }

        * {
            box-sizing: border-box;
        }

        .row {
            display: -ms-flexbox;
            /* IE10 */
            display: flex;
            -ms-flex-wrap: wrap;
            /* IE10 */
            flex-wrap: wrap;
            margin: 0 -16px;
        }

        .col-25 {
            -ms-flex: 25%;
            /* IE10 */
            flex: 25%;
        }

        .col-50 {
            -ms-flex: 50%;
            /* IE10 */
            flex: 50%;
        }

        .col-75 {
            -ms-flex: 75%;
            /* IE10 */
            flex: 75%;
        }

        .col-25,
        .col-50,
        .col-75 {
            padding: 0 16px;
        }

        .container {
            background: rgb(27, 96, 173);
            background: -moz-linear-gradient(288deg, rgba(27, 96, 173, 1) 0%, rgba(76, 171, 227, 1) 100%);
            background: -webkit-linear-gradient(288deg, rgba(27, 96, 173, 1) 0%, rgba(76, 171, 227, 1) 100%);
            background: linear-gradient(288deg, rgba(27, 96, 173, 1) 0%, rgba(76, 171, 227, 1) 100%);
            padding: 5px 20px 15px 20px;
            border: 1px solid blue;
            border-radius: 3px;
        }

        input[type=text] {
            width: 100%;
            margin-bottom: 20px;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 3px;
        }

        input[type=number] {
            width: 100%;
            margin-bottom: 20px;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 3px;
        }

        label {
            margin-bottom: 10px;
            display: block;
        }

        .icon-container {
            margin-bottom: 20px;
            padding: 7px 0;
            font-size: 24px;
        }

        .btn {
            background-color: #4CAF50;
            color: white;
            padding: 12px;
            margin: 10px 0;
            border: none;
            width: 100%;
            border-radius: 3px;
            cursor: pointer;
            font-size: 17px;
        }

        .btn:hover {
            background-color: #45a049;
        }

        a {
            color: #2196F3;
        }

        hr {
            border: 1px solid lightgrey;
        }

        span.price {
            float: right;
            color: grey;
        }

        /* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
        @media (max-width: 800px) {
            .row {
                flex-direction: column-reverse;
            }

            .col-25 {
                margin-bottom: 20px;
            }
        }
    </style>
</head>

<body>


    <div class="row" style="padding:100px 35vw;">
        <div class="col-40">
            <div class="container">
                <form action="payscript.php" method="post" style="padding: 25px;">

                    <div class="row">
                        <div class="col-25">
                            <h2 style="text-align: center;margin:20px 10px;font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">Checkout Form</h2>


                            <label for="fname"><i class="fa fa-user"></i> Full Name</label>
                            <input type="text" id="fname" name="name" placeholder="John Snow">
                            <label for="email"><i class="fa fa-envelope"></i> Email</label>
                            <input type="text" id="email" name="email" placeholder="johnsnow@mail.com">
                            <input type="hidden" value="<?php echo 'OID' . rand(100, 1000); ?>" name="orderid">
                            <label for="amount"><i class="fa fa-inr"></i> Amount</label>
                            <input type="number" name="amount" placeholder="5000">
                            <label for="city"><i class="fa fa-mobile"></i> Mobile</label>
                            <input type="text" id="city" name="mobile" placeholder="Mobile Number">
                            <label for="adr"><i class="fa fa-address-card-o"></i> Address</label>
                            <input type="text" id="adr" name="address" placeholder="Castel Black,Night's Watch, Winterfell">



                        </div>

                        <input type="submit" value="Pay Now" class="btn">
                </form>
            </div>
        </div>

    </div>

</body>

</html>