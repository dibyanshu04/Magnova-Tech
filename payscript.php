<?php

$apiKey = "rzp_live_qo9tOG23bwAREd";

?>

<script src="https://code.jquery.com/jquery-3.5.0.js"></script>



<form action="success.html" method="POST">
    <script src="https://checkout.razorpay.com/v1/checkout.js" data-key="<?php echo $apiKey; ?>" data-amount="<?php echo $_POST['amount'] * 100; ?>" data-currency="INR" data-id="<?php echo 'OID' . rand(10, 100) . 'END'; ?>" data-buttontext="Pay with Razorpay" data-name="Magnova Tech" data-description="Course Payment" data-image="https://magnovatech.com/wp-content/themes/superb-lite/img/magnovatechlogo.png" data-prefill.name="<?php echo $_POST['name']; ?>" data-prefill.email="<?php echo $_POST['email']; ?>" data-prefill.contact="<?php echo $_POST['mobile']; ?>" data-theme.color="#1b60ad"></script>
    <input type="hidden" custom="Hidden Element" name="hidden">
</form>

<style>
    .razorpay-payment-button {
        display: none;
    }
</style>
<script type="text/javascript">
    $(document).ready(function() {
        $('.razorpay-payment-button').click();
    })
</script>