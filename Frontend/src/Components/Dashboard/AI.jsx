import {  useQuery, useQueryClient } from "react-query";
import { Data, getRecord } from ".";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


const AI = () => {
        const { authStatus } = useAuth();
        let { plantId, recordId } = useParams();
        const queryClient = useQueryClient();

        const { data: record, isLoading, error } = useQuery(['record', plantId, recordId], () => getRecord(plantId, recordId, authStatus.token), {
        enabled: !!plantId && !!recordId && !!authStatus.token // Only fetch if all IDs and token are available
        });
        useEffect(() => {
                return () => {
                    // Remove or invalidate the query cache when the component unmounts
                    queryClient.removeQueries(['record', plantId, recordId]);

                    // Or if you prefer to invalidate (mark as stale) the cache
                    // queryClient.invalidateQueries(['record', plantId, recordId]);
                };
            }, [plantId, recordId, queryClient]);

        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
        const image = Data.find(data => data.id === record.id)

  return (
    <div className=" h-[800px] overflow-y-auto text-black flex flex-col space-y-1 bg-gray-300 w-[500px] font-bold m-10 shadow-[50px] rounded-[50px] p-10 ">
            <img src={record.image} alt="" className="rounded-xl w-[400px] h-[300px] self-center" />
            <p className="self-center text-xl">Pie Chart:</p>
         <img src={image.image} alt="" className="rounded-xl w-[400px] h-[400px] self-center object-contain" />
            <p className="self-center text-xl">Recommendations</p>
           <p>
        The presence of leaf blight in maize, especially under conditions of high temperature and humidity, can be challenging for farmers. Leaf blight is a fungal disease that can significantly affect the yield and quality of maize crops. Here are some actionable steps a farmer can take to manage and control leaf blight:
        <br />
        <span className="m-2 text-red-800">Fungicide Application: Apply appropriate fungicides to control the spread of the disease. It's crucial to choose a fungicide that's effective against leaf blight pathogens. The choice of fungicide can depend on the specific type of leaf blight (e.g., Northern leaf blight, Southern leaf blight) and local agricultural guidelines. Always follow the manufacturer's instructions for application rates and safety.

        </span>
        <br />
        Cultural Practices:
        <br />

        Crop Rotation: Rotate maize with non-host crops to reduce the pathogen load in the soil. A 2-3 year rotation cycle with crops like soybeans or small grains can be beneficial.
        Residue Management: Since the pathogens can survive in crop residue, it's important to manage residues effectively. Practices like tillage can help reduce residue and thus the pathogen load, although it should be balanced with soil conservation needs.
        Plant Resistant Varieties: If available, planting maize varieties that are resistant or tolerant to leaf blight can be an effective strategy.
        Optimize Planting Practices:
        <br />
        Spacing: Ensure adequate plant spacing to reduce humidity levels around the plants. This can help in reducing the conditions that favor the growth of the fungus.
        Irrigation Management: Avoid overhead irrigation which can create wet foliage conditions favorable for the disease. Instead, use drip or furrow irrigation methods.
        Monitoring and Early Detection: Regularly scout the fields for early signs of leaf blight and take action before the disease spreads extensively. Early detection is key to effective control.
        <br />
        Integrated Pest Management (IPM): Employ an IPM approach that includes regular field scouting, use of disease forecasting models, and understanding the lifecycle of the pathogen to time fungicide applications more effectively.
        <br />
        Consult with Local Agricultural Extension Services: Local agricultural extension services or a plant pathologist can provide specific advice and recommendations based on local conditions and disease strains.
        <br />
        Remember that the effectiveness of these measures can vary based on the specific conditions of your farm and the local environment. It's also important to consider environmental and safety regulations when applying any chemical treatments.

</p>
            <p>{record.id} </p>

    </div>
  )
}

export default AI
