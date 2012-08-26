jQuery.fn.extend({
	insertAtCursor: function(myValue) {
		return this.each(function(i) {
			if (document.selection) {
				this.focus();
				sel = document.selection.createRange();
				sel.text = myValue;
				this.focus();
			}
			else if (this.selectionStart || this.selectionStart == "0") {
				var startPos = this.selectionStart;
				var endPos = this.selectionEnd;
				var scrollTop = this.scrollTop;
				this.value = this.value.substring(0,startPos) + myValue + this.value.substring(endPos,this.value.length);
				this.focus();
				this.selectionStart = startPos + myValue.length;
				this.selectionEnd = startPos + myValue.length;
				this.scrollTop = scrollTop;
			} 
			else {
				this.value += myValue;
				this.focus();
			}
		});
	},
	insertAroundCursor: function(myValueBefore,myValueAfter) {
		return this.each(function(i) {
			if (document.selection) {
				this.focus();
				sel = document.selection.createRange();
				sel.text = myValueBefore + sel.text + myValueAfter;
				this.focus();
			}
			else if (this.selectionStart || this.selectionStart == "0") {
				var startPos = this.selectionStart;
				var endPos = this.selectionEnd;
				var scrollTop = this.scrollTop;
				this.value = this.value.substring(0,startPos) + myValueBefore + this.value.substring(startPos,endPos) + myValueAfter + this.value.substring(endPos,this.value.length);
				this.focus();
				this.selectionStart = startPos + myValueBefore.length;
				this.selectionEnd = endPos + myValueBefore.length;
				this.scrollTop = scrollTop;
			}
			else {
				this.value += myValueBefore + myValueAfter;
				this.focus();
			}
		});
	},
	selectRange: function(start, end) {
	    return this.each(function(i) {
	        if (this.setSelectionRange) {
	            this.focus();
	            this.setSelectionRange(start, end);
	        } 
			else if (this.createTextRange) {
				var range = this.createTextRange();
				range.collapse(true);
				range.moveEnd('character', end);
				range.moveStart('character', start);
				range.select();
			}
	    });
	}
});

