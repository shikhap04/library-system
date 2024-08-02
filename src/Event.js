import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Event = () => {
    const { event_id } = useParams();

    // use effect to get info
    return(
        <div>

        </div>
    )
};

export default Event;