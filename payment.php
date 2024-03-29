<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Payment - Magnova Tech</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.1/font/bootstrap-icons.css">
    <style>
        body {
            font-family: Arial;
            font-size: 17px;
            padding: 8px;

        }

        * {
            box-sizing: border-box;
        }

        .f {
            background: rgb(27, 96, 173);
            background: -moz-linear-gradient(288deg, rgba(27, 96, 173, 1) 0%, rgba(76, 171, 227, 1) 100%);
            background: -webkit-linear-gradient(288deg, rgba(27, 96, 173, 1) 0%, rgba(76, 171, 227, 1) 100%);
            background: linear-gradient(288deg, rgba(27, 96, 173, 1) 0%, rgba(76, 171, 227, 1) 100%);
            padding: 5px 20px 15px 20px;
            border: 1px solid blue;
            border-radius: 3px;
            min-height: 95vh;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="row ">
            <div class="col-md-1"></div>
            <div class="col-md-4 f">
                <h3 class="text-white text-center m-5" style="font-family:'Times New Roman', Times, serif;">Online Payment Form<p style="font-size: 0.7rem; font-family:Arial, Helvetica, sans-serif">Magnova Engineers - Course Fee</p>
                    <form action="payscript.php" method="post">
                </h3>

                <div class="form-floating mb-3 ">
                    <input type="text" class="form-control" id="firstName" name="name" placeholder="John Snow">
                    <label for="firstName">Full Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="emailaddress" name="email" placeholder="johnsnow@mail.com">
                    <label for="emailaddress">Email</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="number" class="form-control" id="floatingAmount" name="amount" placeholder="5000" required>
                    <label for="floatingAmount">Amount</label>
                </div>
                <input type="hidden" value="<?php echo 'OID' . rand(100, 1000); ?>" name="orderid">
                <div class="form-floating mb-3">
                    <input type="tel" class="form-control" id="MobileNumber" name="mobile" placeholder="94333xxxxx" required>
                    <label for="MobileNumber">Mobile</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="Address" name="address" placeholder="Castel Black,Night's Watch, Winterfell">
                    <label for="Address">Address</label>
                </div>


                <input type="submit" value="Pay Now" class="btn btn-success mt-5" style="width: 100%;">
                </form>

            </div>
            <div class="col-md-2 text-white">.</div>
            <div class="col-md-5 f">
                <h3 class="text-white text-center m-5" style="font-family:'Times New Roman', Times, serif;">Pay Course Fees in INR
                    <p style="font-size: 0.8rem; font-family:Arial, Helvetica, sans-serif" class="text-dark">Contact Us:- <a class="text-dark " href="mailto:info@magnovatech.com"><i class="bi bi-envelope-fill"></i> info@magnovatech.com</a></p>
                </h3>
                <h3 class="text-white text-center m-5" style="font-family:'Times New Roman', Times, serif;">Terms & Conditions
                </h3>

                <ol style="color: whitesmoke;" type="1">
                    <li>Fees structure is inclusive of all taxes. Fees once paid will not be refunded back.</li>
                    <li>I hereby agree to pay the Course Fees towards the Course enrolment at Magnova Engineers LLP.</li>
                    <li>I hereby agree to all the terms & conditions set by Magnova Engineers LLP. and I assure you that the information
                        provided by me is true to the best of my knowledge and I shall strictly follow the rules and regulations set by Magnova
                        Engineers LLP.</li> <br>

                </ol>
                <p style="text-align: justify;" class="text-warning">You agree to share information entered on this page with Better Experience (owner of this page) and Razorpay,
                    adhering
                    to applicable laws.</p>


            </div>

        </div>
    </div>


    </form>
    </div>
    </div>

    </div>

    <!-- Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>
</body>

</html>