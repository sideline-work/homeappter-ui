import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        id: 1,
        memberMlsId: 'user1',
        password: 'pass1',
        authToken: 'mock-jwt-token-1',
        memberName: 'User One',
        email: 'user1@example.com',
        phoneNumber: '123-456-7890',
        role: 'MEMBER',
        photo: 'user1.jpg',
      },
      {
        id: 2,
        memberMlsId: 'user2',
        password: 'pass2',
        authToken: 'mock-jwt-token-2',
        memberName: 'User Two',
        email: 'user2@example.com',
        phoneNumber: '987-654-3210',
        role: 'ADMIN',
        photo: 'user2.jpg',
      },
    ];
    const notifications = [
      {
        notificationId: 1,
        notificationMessage: 'New appointment scheduled',
        from: 2,
        action: 'VIEW',
        date: new Date('2025-05-11T10:00:00Z'),
        notifId: 101,
        notifTitle: 'Appointment Request',
        notifType: 'appointment_request',
        refLink: '/appointments/101',
      },
      {
        notificationId: 2,
        notificationMessage: 'Feedback received',
        from: 1,
        action: 'REVIEW',
        date: new Date('2025-05-10T15:30:00Z'),
        notifId: 102,
        notifTitle: 'Feedback Received',
        notifType: 'feedback_received',
        refLink: '/feedback/102',
      },
    ];
    const appointments = [
      {
        appointmentId: 1,
        ticketId: 'TICKET-001',
        refId: 'REF-001',
        listingId: 'LIST-001',
        mlsNumber: 'MLS123',
        date: new Date('2025-05-11T10:00:00Z'),
        startTime: '10:00',
        endTime: '11:00',
        hostMemberMlsId: 'user1',
        message: 'Showing for MLS123',
        appointmentStatus: 'CONFIRMED',
        requestStatus: 'OPEN',
        requestType: 'SHOWING',
        requestByUid: 2,
        requestByMlsId: 'user2',
        requestedDate: new Date('2025-05-10T08:00:00Z'),
        appointmentInfo: {
          rowId: 1,
          appointmentId: 1,
          mlsNumber: 'MLS123',
          fullAddress: '123 Main St, City',
          thumbnailUrl: 'http://example.com/thumb1.jpg',
          price: 500000,
          propertyStatus: 'ACTIVE',
          listAgentMlsId: 'user1',
          listAgentFullName: 'User One',
        },
      },
      {
        appointmentId: 2,
        ticketId: 'TICKET-002',
        refId: 'REF-002',
        listingId: 'LIST-002',
        mlsNumber: 'MLS456',
        date: new Date('2025-05-12T14:00:00Z'),
        startTime: '14:00',
        endTime: '15:00',
        hostMemberMlsId: 'user2',
        message: 'Showing for MLS456',
        appointmentStatus: 'REQUESTED',
        requestStatus: 'INPROGRESS',
        requestType: 'SHOWING',
        requestByUid: 1,
        requestByMlsId: 'user1',
        requestedDate: new Date('2025-05-11T09:00:00Z'),
        appointmentInfo: {
          rowId: 2,
          appointmentId: 2,
          mlsNumber: 'MLS456',
          fullAddress: '456 Oak St, City',
          thumbnailUrl: 'http://example.com/thumb2.jpg',
          price: 750000,
          propertyStatus: 'ACTIVE',
          listAgentMlsId: 'user2',
          listAgentFullName: 'User Two',
        },
      },
      {
        appointmentId: 3,
        ticketId: 'TICKET-003',
        refId: 'REF-003',
        listingId: 'LIST-001',
        mlsNumber: 'MLS123',
        date: new Date('2025-05-13T09:00:00Z'),
        startTime: '09:00',
        endTime: '10:00',
        hostMemberMlsId: 'user1',
        message: 'Canceled showing for MLS123',
        appointmentStatus: 'CANCELED',
        requestStatus: 'CLOSED',
        requestType: 'SHOWING',
        requestByUid: 2,
        requestByMlsId: 'user2',
        requestedDate: new Date('2025-05-12T08:00:00Z'),
        appointmentInfo: {
          rowId: 3,
          appointmentId: 3,
          mlsNumber: 'MLS123',
          fullAddress: '123 Main St, City',
          thumbnailUrl: 'http://example.com/thumb1.jpg',
          price: 500000,
          propertyStatus: 'ACTIVE',
          listAgentMlsId: 'user1',
          listAgentFullName: 'User One',
        },
      },
    ];
    const timeSlots = [
      {
        mlsId: 'user1',
        requestDate: '2025-05-11',
        takenTimeSlot: [
          { startDateTime: new Date('2025-05-11T10:00:00Z'), endDateTime: new Date('2025-05-11T11:00:00Z') },
        ],
        availableTimeSlot: [
          { startDateTime: new Date('2025-05-11T12:00:00Z'), endDateTime: new Date('2025-05-11T13:00:00Z') },
          { startDateTime: new Date('2025-05-11T14:00:00Z'), endDateTime: new Date('2025-05-11T15:00:00Z') },
        ],
      },
    ];
    const dashboardStats = [
      {
        userId: 1,
        showingRequest: 5,
        appointmentRequest: 3,
        newListing: 2,
        notificationCount: 2,
        totalAgentListings: 10,
        totalAgentDisabledListings: 1,
        totalAgentDraftListings: 2,
        totalAgentUpdatedListings: 3,
        notifications: notifications,
        appointmentUserRequested: {
          today: { confirmed: 1, pending: 0 },
          tomorrow: { confirmed: 2, pending: 1 },
          week: { confirmed: 5, pending: 3 },
          month: { confirmed: 10, pending: 5 },
        },
        appointmentOtherRequested: {
          today: { confirmed: 0, pending: 1 },
          tomorrow: { confirmed: 1, pending: 2 },
          week: { confirmed: 3, pending: 4 },
          month: { confirmed: 8, pending: 6 },
        },
      },
    ];
    const feedbackQuestions = [
      {
        feedbackquestionId: 1,
        question: 'How was the property condition?',
        type: 'MULTIPLE_CHOICE',
        options: ['Excellent', 'Good', 'Fair', 'Poor'],
      },
      {
        feedbackquestionId: 2,
        question: 'Would you recommend this property?',
        type: 'YES_NO',
        options: ['Yes', 'No'],
      },
      {
        feedbackquestionId: 3,
        question: 'Any additional comments?',
        type: 'TEXT',
        options: [],
      },
    ];
    const feedbackAppointments = [
      {
        appointmentId: '1',
        mlsNumber: 'MLS123',
        appointmentInfo: {
          fullAddress: '123 Main St, City',
          listingId: 1,
          listingAgent: 'User One',
          office: 'Realty Co',
          agentEmail: 'user1@example.com',
          thumbnailUrl: 'http://example.com/thumb1.jpg',
          price: 500000,
          date: new Date('2025-05-11T10:00:00Z'),
          startTime: '10:00',
          endTime: '11:00',
        },
        feedback: [
          { question: 'How was the property condition?', answer: 'Good' },
          { question: 'Would you recommend this property?', answer: 'Yes' },
        ],
      },
      {
        appointmentId: '2',
        mlsNumber: 'MLS456',
        appointmentInfo: {
          fullAddress: '456 Oak St, City',
          listingId: 2,
          listingAgent: 'User Two',
          office: 'Estate Co',
          agentEmail: 'user2@example.com',
          thumbnailUrl: 'http://example.com/thumb2.jpg',
          price: 750000,
          date: new Date('2025-05-12T14:00:00Z'),
          startTime: '14:00',
          endTime: '15:00',
        },
        feedback: [
          { question: 'How was the property condition?', answer: 'Excellent' },
          { question: 'Any additional comments?', answer: 'Great location!' },
        ],
      },
    ];
    const properties = [
      {
        rowId: 1,
        listingId: 'LIST-001',
        mlsNumber: 'MLS123',
        propertyType: 'Single Family',
        propertyStatus: 'ACTIVE',
        streetNumber: '123',
        streetDirPrefix: '',
        streetName: 'Main',
        streetSuffix: 'St',
        streetDirSuffix: '',
        unitNumber: '',
        city: 'City',
        zipCode: '12345',
        country: 'USA',
        fullAddress: '123 Main St, City, USA 12345',
        latitude: '40.7128',
        longitude: '-74.0060',
        coordinates: '40.7128,-74.0060',
        listPrice: 500000,
        closePrice: 0,
        closeDate: null,
        area: 2000,
        subdivision: 'Downtown',
        masterPlanned: 'No',
        marketArea: 'Central',
        schoolDistrict: 'City ISD',
        schoolElementary: 'City Elementary',
        schoolMiddle: 'City Middle',
        schoolHigh: 'City High',
        buildingSqft: 2000,
        priceSqftList: '250.00',
        priceSqftSold: '0.00',
        lotSizeSqft: 5000,
        lotSizeAcres: 0.11,
        priceAcresList: '4545454.55',
        yearBuild: 2010,
        bedrooms: '3',
        bathsFull: 2,
        bathsHalf: 1,
        bathTotal: 3,
        roomCount: 8,
        fireplaceNumber: 1,
        stories: 2,
        newConstruction: 0,
        poolPrivate: 'No',
        noOfGarage: 2,
        style: 'Colonial',
        listOfOfficeMlsid: 'OFFICE1',
        listOfficeName: 'Realty Co',
        listAgentMlsid: 'user1',
        listAgentFullname: 'User One',
        listAgentEmail: 'user1@example.com',
        listAgentPhone: '123-456-7890',
        listAgentPhotoUrl: 'http://example.com/user1.jpg',
        listChangeTime: new Date('2025-05-01T12:00:00Z'),
        listDate: new Date('2025-05-01T00:00:00Z'),
        photoUrl: 'http://example.com/property1.jpg',
        directions: 'From downtown, head north on Main St',
        publicRemarks: 'Beautiful colonial home',
        homeappterMember: null,
        showingEnabled: true,
        showingDuration: 60,
        propertyMedia: [
          {
            rowId: 1,
            mlsNumber: 'MLS123',
            photoUrl: 'http://example.com/property1-1.jpg',
            mediaKey: 'MEDIA1',
          },
          {
            rowId: 2,
            mlsNumber: 'MLS123',
            photoUrl: 'http://example.com/property1-2.jpg',
            mediaKey: 'MEDIA2',
          },
        ],
      },
      {
        rowId: 2,
        listingId: 'LIST-002',
        mlsNumber: 'MLS456',
        propertyType: 'Condo',
        propertyStatus: 'PENDING',
        streetNumber: '456',
        streetDirPrefix: '',
        streetName: 'Oak',
        streetSuffix: 'St',
        streetDirSuffix: '',
        unitNumber: '101',
        city: 'City',
        zipCode: '12345',
        country: 'USA',
        fullAddress: '456 Oak St Unit 101, City, USA 12345',
        latitude: '40.7129',
        longitude: '-74.0061',
        coordinates: '40.7129,-74.0061',
        listPrice: 750000,
        closePrice: 0,
        closeDate: null,
        area: 1500,
        subdivision: 'Uptown',
        masterPlanned: 'Yes',
        marketArea: 'North',
        schoolDistrict: 'City ISD',
        schoolElementary: 'City Elementary',
        schoolMiddle: 'City Middle',
        schoolHigh: 'City High',
        buildingSqft: '1500',
        priceSqftList: '500.00',
        priceSqftSold: '0.00',
        lotSizeSqft: 0,
        lotSizeAcres: 0,
        priceAcresList: '0.00',
        yearBuild: 2015,
        bedrooms: '2',
        bathsFull: 2,
        bathsHalf: 0,
        bathTotal: 2,
        roomCount: 6,
        fireplaceNumber: 0,
        stories: 1,
        newConstruction: 0,
        poolPrivate: 'Yes',
        noOfGarage: 1,
        style: 'Modern',
        listOfOfficeMlsid: 'OFFICE2',
        listOfficeName: 'Estate Co',
        listAgentMlsid: 'user2',
        listAgentFullname: 'User Two',
        listAgentEmail: 'user2@example.com',
        listAgentPhone: '987-654-3210',
        listAgentPhotoUrl: 'http://example.com/user2.jpg',
        listChangeTime: new Date('2025-05-02T12:00:00Z'),
        listDate: new Date('2025-05-02T00:00:00Z'),
        photoUrl: 'http://example.com/property2.jpg',
        directions: 'From uptown, head south on Oak St',
        publicRemarks: 'Modern condo with pool',
        homeappterMember: null,
        showingEnabled: true,
        showingDuration: 45,
        propertyMedia: [
          {
            rowId: 3,
            mlsNumber: 'MLS456',
            photoUrl: 'http://example.com/property2-1.jpg',
            mediaKey: 'MEDIA3',
          },
        ],
      },
    ];
    const preferences = [
      {
        preferenceId: 1,
        mlsNumber: 'MLS123',
        approvalType: 'AUTO',
        homeStatus: 'OCCUPIED',
        minsBeforeNotice: '30',
        workTime: '09:00-17:00',
        showingDuration: '60',
        overlapping: false,
        accompaniedShowing: true,
        privateNotes: 'Please call ahead',
        showingInstructions: 'Use lockbox',
        showingStatus: 'ACTIVE',
        dateAdded: new Date('2025-05-01T00:00:00Z'),
        lastUpdate: new Date('2025-05-01T12:00:00Z'),
        accessList: [
          {
            accessId: 1,
            mlsNumber: 'MLS123',
            accessType: 'LOCKBOX',
            accessCode: '1234',
            remarks: 'Lockbox on front door',
            location: 'Front Door',
          },
        ],
        contactList: [
          {
            contactPrefId: 1,
            mlsNumber: 'MLS123',
            contactType: 'AGENT',
            name: 'User One',
            phone: '123-456-7890',
            email: 'user1@example.com',
            notifViaEmail: true,
            notifViaCall: false,
            notifViaSms: true,
            receivedNotifShowingApproval: true,
            receivedNotifAppointmentStatus: true,
            receivedNotifShowingFeedback: false,
            priority: true,
          },
        ],
        blockDateList: [
          {
            blockId: 1,
            mlsNumber: 'MLS123',
            startDate: new Date('2025-05-15'),
            startTime: '09:00',
            endDate: new Date('2025-05-15'),
            endTime: '12:00',
            showingDuration: 180,
            overlapping: false,
          },
        ],
      },
      {
        preferenceId: 2,
        mlsNumber: 'MLS456',
        approvalType: 'MANUAL',
        homeStatus: 'VACANT',
        minsBeforeNotice: '15',
        workTime: '08:00-18:00',
        showingDuration: '45',
        overlapping: true,
        accompaniedShowing: false,
        privateNotes: 'No pets allowed',
        showingInstructions: 'Key under mat',
        showingStatus: 'ACTIVE',
        dateAdded: new Date('2025-05-02T00:00:00Z'),
        lastUpdate: new Date('2025-05-02T12:00:00Z'),
        accessList: [
          {
            accessId: 2,
            mlsNumber: 'MLS456',
            accessType: 'KEY',
            accessCode: '',
            remarks: 'Key under doormat',
            location: 'Doormat',
          },
        ],
        contactList: [
          {
            contactPrefId: 2,
            mlsNumber: 'MLS456',
            contactType: 'OWNER',
            name: 'User Two',
            phone: '987-654-3210',
            email: 'user2@example.com',
            notifViaEmail: false,
            notifViaCall: true,
            notifViaSms: false,
            receivedNotifShowingApproval: false,
            receivedNotifAppointmentStatus: true,
            receivedNotifShowingFeedback: true,
            priority: false,
          },
        ],
        blockDateList: [],
      },
    ];
    const beforeNotices = [
      { id: 1, duration: '15 minutes', value: 15 },
      { id: 2, duration: '30 minutes', value: 30 },
      { id: 3, duration: '1 hour', value: 60 },
    ];
    const showingDurations = [
      { id: 1, duration: '30 minutes', value: 30 },
      { id: 2, duration: '45 minutes', value: 45 },
      { id: 3, duration: '1 hour', value: 60 },
    ];
    const newListings = {
      enabledListing: [
        {
          mlsNumber: 'MLS123',
          fullAddress: '123 Main St, City, USA 12345',
          preferenceStatus: 'ACTIVE',
          propertType: 'Single Family',
          showingStatus: 'ACTIVE',
        },
      ],
      disabledListing: [
        {
          mlsNumber: 'MLS456',
          fullAddress: '456 Oak St Unit 101, City, USA 12345',
          preferenceStatus: 'DISABLED',
          propertType: 'Condo',
          showingStatus: 'INACTIVE',
        },
      ],
    };
    return {
      users,
      notifications,
      appointments,
      timeSlots,
      dashboardStats,
      feedbackQuestions,
      feedbackAppointments,
      properties,
      preferences,
      beforeNotices,
      showingDurations,
      newListings,
    };
  }

  post(reqInfo: RequestInfo): Observable<any> {
    const req = reqInfo.req as HttpRequest<any>;
    const { url, utils } = reqInfo;
    const db = utils.getDb();

    // POST /api/member/login
    if (url.endsWith('/api/member/login')) {
      const { memberMlsId, password } = req.body;
      const user = db['users'].find(
        (u: any) => u.memberMlsId === memberMlsId && u.password === password
      );
      if (user) {
        return utils.createResponse$(() => ({
          body: {
            data: {
              uid: user.id,
              memberMlsId: user.memberMlsId,
              authToken: user.authToken,
              memberName: user.memberName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              role: user.role,
              photo: user.photo,
            },
            message: 'Login successful',
          },
          status: 200,
        }));
      }
      return utils.createResponse$(() => ({
        body: { error: 'Invalid credentials' },
        status: 401,
      }));
    }

    // POST /api/forgotPassword
    if (url.endsWith('/api/forgotPassword')) {
      const { email } = req.body;
      const user = db['users'].find((u: any) => u.email === email);
      if (user) {
        return utils.createResponse$(() => ({
          body: { success: true, message: 'Password reset email sent' },
          status: 200,
        }));
      }
      return utils.createResponse$(() => ({
        body: { error: 'Email not found' },
        status: 404,
      }));
    }

    // POST /api/member/registration
    if (url.endsWith('/api/member/registration')) {
      const newUser = req.body;
      newUser.id = db['users'].length + 1;
      newUser.authToken = `mock-jwt-token-${newUser.id}`;
      newUser.role = newUser.role || 'MEMBER';
      newUser.photo = newUser.photo || 'default.jpg';
      db['users'].push(newUser);
      return utils.createResponse$(() => ({
        body: { success: true, data: newUser, message: 'Registration successful' },
        status: 201,
      }));
    }

    // POST /api/member/verify
    if (url.endsWith('/api/member/verify')) {
      const { email } = req.body;
      const user = db['users'].find((u: any) => u.email === email);
      if (user) {
        return utils.createResponse$(() => ({
          body: { success: true, message: 'Member verified' },
          status: 200,
        }));
      }
      return utils.createResponse$(() => ({
        body: { error: 'Verification failed' },
        status: 400,
      }));
    }

    // POST /api/core/verify/otp/{otp}
    if (url.includes('/api/core/verify/otp/')) {
      const otp = url.split('/').pop();
      if (otp && otp.length > 0) {
        return utils.createResponse$(() => ({
          body: { success: true, message: 'OTP verified' },
          status: 200,
        }));
      }
      return utils.createResponse$(() => ({
        body: { error: 'Invalid OTP' },
        status: 400,
      }));
    }

    // POST /api/appointment/schedule
    if (url.endsWith('/api/appointment/schedule')) {
      const appointment = req.body;
      appointment.appointmentId = db['appointments'].length + 1;
      appointment.ticketId = `TICKET-${appointment.appointmentId.toString().padStart(3, '0')}`;
      appointment.refId = `REF-${appointment.appointmentId.toString().padStart(3, '0')}`;
      db['appointments'].push(appointment);
      return utils.createResponse$(() => ({
        body: appointment,
        status: 201,
      }));
    }

    // POST /api/admin/sendEmail
    if (url.endsWith('/api/admin/sendEmail')) {
      const { appointmentId, refId, email } = req.body;
      return utils.createResponse$(() => ({
        body: { success: true, message: `Email sent to ${email} for appointment ${appointmentId}` },
        status: 200,
      }));
    }

    // POST /api/appointment/savedFeedback
    if (url.endsWith('/api/appointment/savedFeedback')) {
      const feedbackRequest = req.body;
      const appointment = db['feedbackAppointments'].find(
        (fa: any) => fa.appointmentId === feedbackRequest.appointmentId
      );
      if (appointment) {
        const newFeedback = feedbackRequest.answer.map((ans: any) => ({
          question: db['feedbackQuestions'].find((q: any) => q.feedbackquestionId === ans.feedbackquestionId)?.question,
          answer: ans.answer,
        }));
        appointment.feedback.push(...newFeedback);
        return utils.createResponse$(() => ({
          body: { success: true, message: 'Feedback saved successfully' },
          status: 200,
        }));
      }
      return utils.createResponse$(() => ({
        body: { error: 'Appointment not found' },
        status: 404,
      }));
    }

    // POST /api/listing/property/saveNew
    if (url.endsWith('/api/listing/property/saveNew')) {
      const listing = req.body;
      listing.rowId = db['properties'].length + 1;
      listing.listingId = `LIST-${listing.rowId.toString().padStart(3, '0')}`;
      listing.mlsNumber = `MLS${100 + listing.rowId}`;
      db['properties'].push(listing);
      return utils.createResponse$(() => ({
        body: { success: true, message: 'Listing saved successfully' },
        status: 201,
      }));
    }

    // POST /api/listing/property/searchAdvanced?filter={filter}
    if (url.includes('/api/listing/property/searchAdvanced')) {
      const filter = reqInfo.query.get('filter')?.[0];
      const searchRequest = req.body;
      const filteredProperties = db['properties'].filter((p: any) => {
        const matchesMls = !searchRequest.mlsNumber || p.mlsNumber.includes(searchRequest.mlsNumber);
        const matchesAddress = !searchRequest.address || p.fullAddress.toLowerCase().includes(searchRequest.address.toLowerCase());
        const matchesSubdivision = !searchRequest.subdivision || p.subdivision.toLowerCase().includes(searchRequest.subdivision.toLowerCase());
        const matchesAgent = !searchRequest.memberMlsId || p.listAgentMlsid === searchRequest.memberMlsId;
        const matchesFilter = !filter || p.propertyStatus.toLowerCase() === filter.toLowerCase();
        return matchesMls && matchesAddress && matchesSubdivision && matchesAgent && matchesFilter;
      });
      return utils.createResponse$(() => ({
        body: filteredProperties,
        status: 200,
      }));
    }

    // POST /api/listing/preference
    if (url.endsWith('/api/listing/preference')) {
      const request = req.body;
      const newPreference = {
        ...request,
        preferenceId: db['preferences'].length + 1,
        dateAdded: new Date(),
        lastUpdate: new Date(),
        accessList: [],
        contactList: [],
        blockDateList: [],
      };
      db['preferences'].push(newPreference);
      return utils.createResponse$(() => ({
        body: newPreference,
        status: 201,
      }));
    }

    // POST /api/listing/preference/access
    if (url.endsWith('/api/listing/preference/access')) {
      const request = req.body;
      const preference = db['preferences'].find((p: any) => p.mlsNumber === request.mlsNumber);
      if (preference) {
        const newAccess = {
          ...request,
          accessId: preference.accessList.length + 1,
          accessCode: request.accessCode || '',
          location: request.location || '',
          remarks: request.remarks || '',
        };
        preference.accessList.push(newAccess);
        return utils.createResponse$(() => ({
          body: newAccess,
          status: 201,
        }));
      }
      return utils.createResponse$(() => ({
        body: { error: 'Preference not found' },
        status: 404,
      }));
    }

    // POST /api/listing/preference/block
    if (url.endsWith('/api/listing/preference/block')) {
      const request = req.body;
      const preference = db['preferences'].find((p: any) => p.mlsNumber === request.mlsNumber);
      if (preference) {
        const newBlock = {
          ...request,
          blockId: preference.blockDateList.length + 1,
          startDate: new Date(request.startDate),
          endDate: new Date(request.endDate),
          showingDuration: request.showingDuration || preference.showingDuration,
          overlapping: request.overlapping || preference.overlapping,
        };
        preference.blockDateList.push(newBlock);
        return utils.createResponse$(() => ({
          body: newBlock,
          status: 201,
        }));
      }
      return utils.createResponse$(() => ({
        body: { error: 'Preference not found' },
        status: 404,
      }));
    }

    // POST /api/listing/preference/contacts
    if (url.endsWith('/api/listing/preference/contacts')) {
      const request = req.body;
      const preference = db['preferences'].find((p: any) => p.mlsNumber === request.mlsNumber);
      if (preference) {
        const newContact = {
          ...request,
          contactPrefId: preference.contactList.length + 1,
          name: request.name || '',
        };
        preference.contactList.push(newContact);
        return utils.createResponse$(() => ({
          body: newContact,
          status: 201,
        }));
      }
      return utils.createResponse$(() => ({
        body: { error: 'Preference not found' },
        status: 404,
      }));
    }

    return undefined as any;
  }

  put(reqInfo: RequestInfo): Observable<any> {
    const req = reqInfo.req as HttpRequest<any>;
    const { url, utils } = reqInfo;
    const db = utils.getDb();

    // PUT /api/appointment/update/status?refId={refId}
    if (url.includes('/api/appointment/update/status')) {
      const refId = reqInfo.query.get('refId')?.[0];
      const appointmentUpdate = req.body;
      const appointment = db['appointments'].find((a: any) => a.refId === refId);
      if (appointment) {
        Object.assign(appointment, {
          appointmentStatus: appointmentUpdate.appointmentStatus,
          requestStatus: appointmentUpdate.requestStatus,
          message: appointmentUpdate.remarks,
        });
        return utils.createResponse$(() => ({
          body: {
            logUUID: `UUID-${refId}`,
            code: 'SUCCESS',
            message: 'Appointment updated successfully',
          },
          status: 200,
        }));
      }
      return utils.createResponse$(() => ({
        body: { error: 'Appointment not found' },
        status: 404,
      }));
    }

    // PUT /api/admin/{refId}/action
    if (url.includes('/api/admin/') && url.includes('/action')) {
      const refId = url.split('/')[4];
      const appointmentUpdate = req.body;
      const appointment = db['appointments'].find((a: any) => a.refId === refId);
      if (appointment) {
        Object.assign(appointment, {
          appointmentStatus: appointmentUpdate.appointmentStatus,
          requestStatus: appointmentUpdate.requestStatus,
          message: appointmentUpdate.remarks,
        });
        return utils.createResponse$(() => ({
          body: {
            logUUID: `UUID-${refId}`,
            code: 'SUCCESS',
            message: 'Appointment status updated successfully',
          },
          status: 200,
        }));
      }
      return utils.createResponse$(() => ({
        body: { error: 'Appointment not found' },
        status: 404,
      }));
    }

    // PUT /api/listing/preference/disabled/{mlsNumber}
    if (url.includes('/api/listing/preference/disabled/')) {
      const mlsNumber = url.split('/').pop();
      const preference = db['preferences'].find((p: any) => p.mlsNumber === mlsNumber);
      if (preference) {
        preference.showingStatus = 'INACTIVE';
        return utils.createResponse$(() => ({
          body: { success: true, message: 'Preference disabled' },
          status: 200,
        }));
      }
      return utils.createResponse$(() => ({
        body: { error: 'Preference not found' },
        status: 404,
      }));
    }

    return undefined as any;
  }

  delete(reqInfo: RequestInfo): Observable<any> {
    const { url, utils } = reqInfo;
    const db = utils.getDb();

    // DELETE /api/listing/deletion/preference/{id}?form={form}
    if (url.includes('/api/listing/deletion/preference/')) {
      const id = parseInt(url.split('/').pop(), 10);
      const form = reqInfo.query.get('form')?.[0];
      let deleted = false;
      db['preferences'].forEach((pref: any) => {
        if (form === 'access') {
          const index = pref.accessList.findIndex((a: any) => a.accessId === id);
          if (index !== -1) {
            pref.accessList.splice(index, 1);
            deleted = true;
          }
        } else if (form === 'block') {
          const index = pref.blockDateList.findIndex((b: any) => b.blockId === id);
          if (index !== -1) {
            pref.blockDateList.splice(index, 1);
            deleted = true;
          }
        } else if (form === 'contacts') {
          const index = pref.contactList.findIndex((c: any) => c.contactPrefId === id);
          if (index !== -1) {
            pref.contactList.splice(index, 1);
            deleted = true;
          }
        }
      });
      if (deleted) {
        return utils.createResponse$(() => ({
          body: { success: true, message: `${form} preference deleted`, form },
          status: 200,
        }));
      }
      return utils.createResponse$(() => ({
        body: { error: 'Preference not found' },
        status: 404,
      }));
    }

    // DELETE /api/listing/cancel/preference/{mlsNumber}?state={state}
    if (url.includes('/api/listing/cancel/preference/')) {
      const mlsNumber = url.split('/').pop();
      const state = reqInfo.query.get('state')?.[0];
      const preference = db['preferences'].find((p: any) => p.mlsNumber === mlsNumber);
      if (preference) {
        if (state === 'access') {
          preference.accessList = [];
        } else if (state === 'block') {
          preference.blockDateList = [];
        } else if (state === 'contacts') {
          preference.contactList = [];
        }
        return utils.createResponse$(() => ({
          body: { success: true, message: `${state} preferences canceled` },
          status: 200,
        }));
      }
      return utils.createResponse$(() => ({
        body: { error: 'Preference not found' },
        status: 404,
      }));
    }

    return undefined as any;
  }

  get(reqInfo: RequestInfo): Observable<any> {
    const { url, utils } = reqInfo;
    const db = utils.getDb();

    // GET /api/listing/property/{listingId}
    if (url.match(/\/api\/listing\/property\/[^\/]+$/)) {
      const listingId = url.split('/').filter(Boolean).pop();
      console.log('Mock: Handling GET /api/listing/property/', listingId);
      const property = db['properties'].find(
        (p: any) => p.listingId === listingId || p.mlsNumber === listingId
      );
      if (property) {
        console.log('Mock: Found property:', property);
        const response = {
          rowId: property.rowId,
          listingId: property.listingId,
          mlsNumber: property.mlsNumber,
          propertyType: property.propertyType,
          propertyStatus: property.propertyStatus,
          fullAddress: property.fullAddress,
          listPrice: property.listPrice,
          streetNumber: property.streetNumber,
          streetName: property.streetName,
          city: property.city,
          zipCode: property.zipCode,
          country: property.country,
          latitude: property.latitude,
          longitude: property.longitude,
          photoUrl: property.photoUrl,
          publicRemarks: property.publicRemarks,
          listAgentMlsid: property.listAgentMlsid,
          listAgentFullname: property.listAgentFullname,
        };
        return utils.createResponse$(() => ({
          body: response,
          status: 200,
        }));
      }
      console.log('Mock: Property not found for listingId/mlsNumber:', listingId);
      return utils.createResponse$(() => ({
        body: { error: `Property not found for listingId/mlsNumber: ${listingId}` },
        status: 404,
      }));
    }

    // GET /api/appointment/all
    if (url.endsWith('/api/appointment/all')) {
      return utils.createResponse$(() => ({
        body: db['appointments'],
        status: 200,
      }));
    }

    // GET /api/appointment/list?startDate={startDate}&endDate={endDate}
    if (url.includes('/api/appointment/list')) {
      const startDate = new Date(reqInfo.query.get('startDate')?.[0]);
      const endDate = new Date(reqInfo.query.get('endDate')?.[0]);
      const filteredAppointments = db['appointments'].filter((a: any) => {
        const apptDate = new Date(a.date);
        return apptDate >= startDate && apptDate <= endDate;
      });
      const memberList = db['users'].map((u: any) => ({
        hostMemberMlsId: u.memberMlsId,
        fullName: u.memberName,
        appointmentType: 'SHOWING',
      }));
      return utils.createResponse$(() => ({
        body: {
          appointmentList: filteredAppointments,
          memberList: memberList,
        },
        status: 200,
      }));
    }

    // GET /api/appointment/getAvailableTimeSlots?requestDate={requestDate}&mlsId={mlsId}
    if (url.includes('/api/appointment/getAvailableTimeSlots')) {
      const requestDate = reqInfo.query.get('requestDate')?.[0];
      const mlsId = reqInfo.query.get('mlsId')?.[0];
      const timeSlot = db['timeSlots'].find(
        (ts: any) => ts.mlsId === mlsId && ts.requestDate === requestDate
      );
      if (timeSlot) {
        return utils.createResponse$(() => ({
          body: {
            takenTimeSlot: timeSlot.takenTimeSlot,
            availableTimeSlot: timeSlot.availableTimeSlot,
          },
          status: 200,
        }));
      }
      return utils.createResponse$(() => ({
        body: { takenTimeSlot: [], availableTimeSlot: [] },
        status: 200,
      }));
    }

    // GET /api/appointment/home
    if (url.endsWith('/api/appointment/home')) {
      const stats = db['dashboardStats'][0];
      return utils.createResponse$(() => ({
        body: stats,
        status: 200,
      }));
    }

    // GET /api/appointment/getNotifications
    if (url.endsWith('/api/appointment/getNotifications')) {
      return utils.createResponse$(() => ({
        body: db['notifications'],
        status: 200,
      }));
    }

    // GET /api/feedback/questions
    if (url.endsWith('/api/feedback/questions')) {
      return utils.createResponse$(() => ({
        body: db['feedbackQuestions'],
        status: 200,
      }));
    }

    // GET /api/appointment/getFeedbackAppointmentInfo?type={type}
    if (url.includes('/api/appointment/getFeedbackAppointmentInfo')) {
      const type = reqInfo.query.get('type')?.[0];
      const filteredAppointments = db['feedbackAppointments'].filter(
        (fa: any) => type === 'all' || fa.appointmentInfo.appointmentType === type
      );
      return utils.createResponse$(() => ({
        body: filteredAppointments,
        status: 200,
      }));
    }

    // GET /api/listing/properties
    if (url.endsWith('/api/listing/properties')) {
      return utils.createResponse$(() => ({
        body: db['properties'].map((p: any) => ({ ...p, propertyMedia: undefined })),
        status: 200,
      }));
    }

    // GET /api/listing/property/search?keywords={keyword}&filter={filter}
    if (url.includes('/api/listing/property/search') && !url.includes('searchAdvanced')) {
      const keywords = reqInfo.query.get('keywords')?.[0]?.toLowerCase();
      const filter = reqInfo.query.get('filter')?.[0]?.toLowerCase();
      const filteredProperties = db['properties'].filter((p: any) => {
        const matchesKeywords =
          !keywords ||
          p.fullAddress.toLowerCase().includes(keywords) ||
          p.mlsNumber.toLowerCase().includes(keywords);
        const matchesFilter = !filter || p.propertyStatus.toLowerCase() === filter;
        return matchesKeywords && matchesFilter;
      });
      return utils.createResponse$(() => ({
        body: filteredProperties.map((p: any) => ({ ...p, propertyMedia: undefined })),
        status: 200,
      }));
    }

    // GET /api/listing/preference/before/notice
    if (url.endsWith('/api/listing/preference/before/notice')) {
      return utils.createResponse$(() => ({
        body: db['beforeNotices'],
        status: 200,
      }));
    }

    // GET /api/listing/preference/property/{mlsNumber}
    if (url.includes('/api/listing/preference/property/')) {
      const mlsNumber = url.split('/').pop();
      const preference = db['preferences'].find((p: any) => p.mlsNumber === mlsNumber);
      if (preference) {
        return utils.createResponse$(() => ({
          body: preference,
          status: 200,
        }));
      }
      return utils.createResponse$(() => ({
        body: { error: 'Preference not found' },
        status: 404,
      }));
    }

    // GET /api/listing/preference/access/{mlsNumber}
    if (url.includes('/api/listing/preference/access/')) {
      const mlsNumber = url.split('/').pop();
      const preference = db['preferences'].find((p: any) => p.mlsNumber === mlsNumber);
      if (preference) {
        return utils.createResponse$(() => ({
          body: preference.accessList,
          status: 200,
        }));
      }
      return utils.createResponse$(() => ({
        body: [],
        status: 200,
      }));
    }

    // GET /api/listing/preference/block/{mlsNumber}
    if (url.includes('/api/listing/preference/block/')) {
      const mlsNumber = url.split('/').pop();
      const preference = db['preferences'].find((p: any) => p.mlsNumber === mlsNumber);
      if (preference) {
        return utils.createResponse$(() => ({
          body: preference.blockDateList,
          status: 200,
        }));
      }
      return utils.createResponse$(() => ({
        body: [],
        status: 200,
      }));
    }

    // GET /api/listing/preference/contacts/{mlsNumber}
    if (url.includes('/api/listing/preference/contacts/')) {
      const mlsNumber = url.split('/').pop();
      const preference = db['preferences'].find((p: any) => p.mlsNumber === mlsNumber);
      if (preference) {
        return utils.createResponse$(() => ({
          body: preference.contactList,
          status: 200,
        }));
      }
      return utils.createResponse$(() => ({
        body: [],
        status: 200,
      }));
    }

    // GET /api/listing/property/listing
    if (url.endsWith('/api/listing/property/listing')) {
      return utils.createResponse$(() => ({
        body: db['newListings'],
        status: 200,
      }));
    }

    // GET /api/listing/property/showing/instructions/{mlsNumber}
    if (url.includes('/api/listing/property/showing/instructions/')) {
      const mlsNumber = url.split('/').pop();
      const preference = db['preferences'].find((p: any) => p.mlsNumber === mlsNumber);
      if (preference) {
        const showingInstruction = {
          mlsNumber: preference.mlsNumber,
          showingDuration: parseInt(preference.showingDuration),
          accompaniedShowing: preference.accompaniedShowing,
          showingInstructions: preference.showingInstructions,
          accessList: preference.accessList,
          contactList: preference.contactList,
          blockDateList: preference.blockDateList,
          approvalType: preference.approvalType,
          homeStatus: preference.homeStatus,
          minsBeforeNotice: preference.minsBeforeNotice,
          workTime: preference.workTime,
          overlapping: preference.overlapping,
          privateNotes: preference.privateNotes,
        };
        return utils.createResponse$(() => ({
          body: showingInstruction,
          status: 200,
        }));
      }
      return utils.createResponse$(() => ({
        body: { error: 'Showing instructions not found' },
        status: 404,
      }));
    }

    // GET /api/listing/preference/showing/duration
    if (url.endsWith('/api/listing/preference/showing/duration')) {
      return utils.createResponse$(() => ({
        body: db['showingDurations'],
        status: 200,
      }));
    }

    // GET /api/listing/agentListingsReport?startDate={startDate}&endDate={endDate}
    if (url.includes('/api/listing/agentListingsReport')) {
      const startDate = new Date(reqInfo.query.get('startDate')?.[0]);
      const endDate = new Date(reqInfo.query.get('endDate')?.[0]);
      const filteredProperties = db['properties'].filter((p: any) => {
        const listDate = new Date(p.listDate);
        return listDate >= startDate && listDate <= endDate;
      });
      const activeProperties = filteredProperties.filter((p: any) => p.propertyStatus === 'ACTIVE');
      const pendingProperties = filteredProperties.filter((p: any) => p.propertyStatus === 'PENDING');
      return utils.createResponse$(() => ({
        body: {
          activeProperties: activeProperties.map((p: any) => ({
            rowId: p.rowId,
            listingId: p.listingId,
            mlsNumber: p.mlsNumber,
            propertyType: p.propertyType,
            propertyStatus: p.propertyStatus,
            fullAddress: p.fullAddress,
            listPrice: p.listPrice,
            listDate: p.listDate,
          })),
          pendingProperties: pendingProperties.map((p: any) => ({
            rowId: p.rowId,
            listingId: p.listingId,
            mlsNumber: p.mlsNumber,
            propertyType: p.propertyType,
            propertyStatus: p.propertyStatus,
            fullAddress: p.fullAddress,
            listPrice: p.listPrice,
            listDate: p.listDate,
          })),
        },
        status: 200,
      }));
    }

    // GET /api/appointment/agentShowingReport?startDate={startDate}&endDate={endDate}
    if (url.includes('/api/appointment/agentShowingReport')) {
      const startDate = new Date(reqInfo.query.get('startDate')?.[0]);
      const endDate = new Date(reqInfo.query.get('endDate')?.[0]);
      const filteredAppointments = db['appointments'].filter((a: any) => {
        const apptDate = new Date(a.date);
        return apptDate >= startDate && apptDate <= endDate;
      });
      return utils.createResponse$(() => ({
        body: {
          confirmShowing: filteredAppointments
            .filter((a: any) => a.appointmentStatus === 'CONFIRMED')
            .map((a: any) => a.appointmentInfo),
          requestedShowing: filteredAppointments
            .filter((a: any) => a.appointmentStatus === 'REQUESTED')
            .map((a: any) => a.appointmentInfo),
          cancelShowing: filteredAppointments
            .filter((a: any) => a.appointmentStatus === 'CANCELED')
            .map((a: any) => a.appointmentInfo),
        },
        status: 200,
      }));
    }

    // GET /api/appointment/agentShowingTotal
    if (url.endsWith('/api/appointment/agentShowingTotal')) {
      return utils.createResponse$(() => ({
        body: { total: db['appointments'].length },
        status: 200,
      }));
    }

    return undefined as any;
  }
}