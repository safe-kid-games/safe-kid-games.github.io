function mfSetCookie(cname,cvalue,exhours) {
  var d = new Date();
  exhours = parseInt(exhours);
  d.setTime(d.getTime() + (exhours*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function mfGetCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function mfRemoveCookie(cname) {   
    document.cookie = cname +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function mfDelRecord() {
	var currentcookie	= parseInt( mfGetCookie('mfccsid') );
	if (currentcookie > 0) {
		jQuery.ajax({
			url: mfccsobj.ajaxurl,
			type: 'POST',
			data: {
				logid:	currentcookie,
				action: 'mfccs_delete'
			},
			success: function (response) {
				// Do nothing
			},
			error: function () {
				console.log("Deleting current record failed");
			}
		});
	}
}

function mfccs_logout() {
	mfDelRecord()
	mfRemoveCookie('mfccsid');
	mfRemoveCookie('mfccscode');
}

jQuery(document).ready(function() {
	
	jQuery('[name=add-to-cart]').prop('disabled', true);
	
	jQuery('.mfccs-teacher-form .generate-new').click(function() {
		var mfccsform	= jQuery(this).parents('.mfccs-teacher-form');
		jQuery.ajax({
			url: mfccsobj.ajaxurl,
			type: 'POST',
			data: {
				action: 'mfccs_new'
			},
			success: function (response) {
				if (response == 'new_code_failed') {
					alert('Failed to generate new class code. Please try again!');
					console.log('New class code could not be generated');
				} else {
					mfccsform.find('.mfccs-code-show').val(response);
				}
			},
			error: function () {
				alert('Failed to generate new class code. Please try again!');
				console.log("Ajax request failed");
			}
		});
	});
	
	jQuery('.mfccs-student-form .code-login').click(function() {
		mfDelRecord();
		
		var mfccsform	= jQuery(this).parents('.mfccs-student-form');
		var mfccscodein	= mfccsform.find('.mfccs-code-input');
		var mfccscode	= mfccscodein.val();
		jQuery.ajax({
			url: mfccsobj.ajaxurl,
			type: 'POST',
			data: {
				code:	mfccscode,
				nonce:	mfccsobj.nonce,
				action: 'mfccs_login'
			},
			success: function (response) {
				if (response == 'invalid_nonce') {
					alert('Token Expired! Please refresh the page and try again.');
				} else if (response == 'invalid_code') {
					alert('Class code is invalid.');
				} else if (response == 'max_users') {
					alert('There are currently too many devices signed into this account at once.');
				} else {
					var result = JSON.parse(response);
					mfSetCookie('mfccsid', result.id, mfccsobj.expiry);
					mfSetCookie('mfccscode', result.code, mfccsobj.expiry);
					window.location.href = mfccsobj.home;
				}
			},
			error: function () {
				alert('Failed to login. Please try again!');
				console.log("Ajax request failed");
			}
		});
	});

	jQuery('.mfccs-logout-button').click(function() {
		mfccs_logout();
		alert('Logged out successfully!');
		location.reload();
	});

});