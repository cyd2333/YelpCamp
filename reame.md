<% campground.comments.forEach(function(comment){ %>
    <p> 
        <strong><%= comment.author %> - <%= comment.text %> </strong>
    </p>
<% }); %>