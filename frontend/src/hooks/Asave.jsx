{error ? (
    <p>Erreur lors du chargement des données depuis l'API</p>
) : isLoading ? (
    <Loader />
) : filteredData.length === 0 ? (
    <Navigate to="/404" />
) : (
    <>
        <div className="aaa">

        </div>

    </>
)}