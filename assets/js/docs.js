/* globals $ */

$(document).ready(function() {
	var $deleteButtons = $(".doc-delete");

	// Handle click by sending DELETE request to /api/doc/:fileId
	// On complete, remove the delete button's table row
	$deleteButtons.on("click", function(ev) {
		var $btn = $(ev.target);
		var fileId = $btn.data("fileid");

		$.ajax("/api/doc/" + fileId, {
			method: "DELETE",
			success: function() {
				$btn.parents(".doc").remove();
			},
			error: function() {
				alert("Unable to delete file");
			},
		});
	});
});
