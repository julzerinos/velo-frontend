import {actions} from '@/plugins/vuex/actions'
import axios from 'axios'

jest.mock('axios')

describe('vuex/actions', () => {
    test('logoutAsync calls logout and setResult commits on server resolved', () => {
        expect.hasAssertions()

        axios.post.mockResolvedValueOnce({message: "test"})

        const context = {
            commit: jest.fn(),
            state: {profile: "test"}
        }

        return actions.logoutAsync(context, {
            onSuccess: r => expect(context.commit.mock.calls).toEqual([
                ['setResult', {resultObject: {blame: "logout", message: "test"}}],
                ['logout']
            ])
        })
    });

    test('logoutAsync calls logout and setResult commits on server rejected', () => {
        expect.hasAssertions()

        axios.post.mockRejectedValue({message: "test"})

        const context = {
            commit: jest.fn(),
            state: {profile: "test"}
        }

        return actions.logoutAsync(context, {
            onFail: r => expect(context.commit.mock.calls).toEqual([
                ['setResult', {resultObject: {blame: "logout", message: "test"}}],
                ['logout']
            ])
        })
    });

    test('signupAsync calls setResult commit on server resolved', () => {
        expect.hasAssertions()

        axios.post.mockResolvedValue({message: "test"})

        const context = {
            commit: jest.fn(),
        }

        return actions.signupAsync(context, {
            profile: {
                name: {firstName: "firstName", lastName: "lastName"},
                email: "email", password: "password"
            },
            onSuccess: r => expect(context.commit.mock.calls).toEqual([
                ['setResult', {resultObject: {blame: "signup", message: "test"}}],
            ])
        })
    });

    test('signupAsync calls setResult commit on server rejected', () => {
        expect.hasAssertions()

        axios.post.mockRejectedValue({message: "test"})

        const context = {
            commit: jest.fn(),
        }

        return actions.signupAsync(context, {
            profile: {
                name: {firstName: "firstName", lastName: "lastName"},
                email: "email", password: "password"
            },
            onFail: r => expect(context.commit.mock.calls).toEqual([
                ['setResult', {resultObject: {blame: "signup", message: "test"}}],
            ])
        })
    });

    // TODO: login, user, reset, setresult, removeresult, profilechangeproperty, adddatabricks
});
