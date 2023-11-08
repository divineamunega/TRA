export const createMessage = (message, i) => {
	return `<div class='message' data-massage="${i}">
    <p>
        ${message}
    </p>
</div>`;
};

export const createReply = (reply, i) => {
	return `
    <div class="reply" data-message="${i}">
						<div class="buttons" >
							<div class="buttons--share" role="btn">
								<i class="fa fa-share-square-o" aria-hidden="true"></i>
								<!-- <i class="fa fa-check" aria-hidden="true"></i> -->
							</div>
							<div class="buttons--copy" role="btn">
								<i class="fa fa-clone" aria-hidden="true"></i>
							</div>
						</div>
						<p>
					${reply}
						</p>
					</div>
    `;
};
