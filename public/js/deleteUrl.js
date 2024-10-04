const deleteUrl = async (urlId) => {
    try {
        const confirmation = await Swal.fire({
            title: "Do you want to delete this URL?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });
        if (confirmation.isConfirmed) {
            const result = await axios.delete(`deleteUrl/${urlId}`);
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
            });
        }
    } catch (error) {
        console.log(error);
    } finally {
        window.location.reload(); // Reload the page
    }
};
